using Microsoft.AspNetCore.Mvc;
using BudgetManagmentServer.Models;
using BudgetManagmentServer.Data;
using BudgetManagmentServer.Repository;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.Security.Claims;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private ITransactionRepository _repository;
        private BudgetManagmentContext _context;

        public TransactionsController(ITransactionRepository repository, BudgetManagmentContext context)
        {
            _repository = repository;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllTransactions()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return BadRequest("User ID claim is missing");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest("Invalid User ID claim");
            }

            var transactions = _repository.GetAllTransaction(userId);
            return Ok(transactions);
        }

        private IActionResult CreateTransactionInternal(Transaction transaction, int walletId, int userId)
        {
            transaction.UserID = userId;
            transaction.WalletID = walletId;

            var wallet = _context.Wallets.FirstOrDefault(w => w.WalletID == walletId);
            if (wallet == null)
            {
                return BadRequest("Wallet ID missing");
            }

            if (transaction.Category == "Income")
            {
                transaction.Type = TransactionType.Income;
                transaction.amount = Math.Abs(transaction.amount);
            }
            else
            {
                transaction.Type = TransactionType.Expense;
                transaction.amount = -Math.Abs(transaction.amount);
            }

            float convertedAmount = transaction.amount;
            if (transaction.currency != wallet.WalletCurrency)
            {
                convertedAmount = _repository.Convert(
                    Math.Abs(transaction.amount),
                    transaction.currency,
                    wallet.WalletCurrency
                );
                convertedAmount = transaction.amount < 0 ? -convertedAmount : convertedAmount;
            }

            transaction.ConvertedAmount = convertedAmount;
            wallet.Currency += convertedAmount;

            var newTransaction = _repository.CreateTransaction(transaction);
            _context.SaveChanges();
            return Ok(newTransaction);
        }

        [HttpPost]
        public IActionResult CreateTransaction([FromBody] Transaction transaction)
        {
            int UserIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return CreateTransactionInternal(transaction, transaction.WalletID, UserIdClaim);
        }

        [HttpPost("wallet/{walletId}/transaction")]
        public IActionResult CreateTransactionForWallet(int walletId, [FromBody] Transaction transaction)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return CreateTransactionInternal(transaction, walletId, userId);
        }


        [HttpGet("wallet/{walletID}")]
        public IActionResult GetTransactionByWallet(int walletID)
        {
            int userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var transactions = _context.Transactions.Where(t => t.WalletID == walletID).ToList();
            return Ok(transactions);
        }

        [HttpGet("wallet/{walletID}/totals")]
        public IActionResult GetWalletIncomeTotal(int walletID)
        {
            //int userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var totalIncome = _context.Transactions.Where(t => t.WalletID == walletID && t.Type == TransactionType.Income).Sum(t => t.ConvertedAmount);
            var totalExpense = _context.Transactions.Where(t => t.WalletID == walletID && t.Type == TransactionType.Expense).Sum(t => t.ConvertedAmount);
            return Ok(new
            {
                income = totalIncome,
                expense = totalExpense
            });
        }

        [HttpGet("{transactionID}")]
        public IActionResult GetTransactionById(int transactionID)
        {
            var transaction = _repository.GetTransactionById(transactionID);
            return Ok(transaction);
        }

        [HttpPost("{transactionID}")]
        public IActionResult UpdateTransactionById(int transactionID, Transaction updatedTransaction)
        {
            var existingTransaction = _context.Transactions.FirstOrDefault(t => t.TransactionID == transactionID);
            if (existingTransaction == null)
                return NotFound($"Transaction with id {transactionID} not found.");

            var wallet = _context.Wallets.FirstOrDefault(w => w.WalletID == existingTransaction.WalletID);
            if (wallet == null)
                return BadRequest("Wallet not found.");

            wallet.Currency -= existingTransaction.ConvertedAmount;

            updatedTransaction.Type = updatedTransaction.Category == "Income" ? TransactionType.Income : TransactionType.Expense;
            updatedTransaction.amount = updatedTransaction.Type == TransactionType.Income
                ? Math.Abs(updatedTransaction.amount)
                : -Math.Abs(updatedTransaction.amount);

            float newConvertedAmount = updatedTransaction.amount;
            if (updatedTransaction.currency != wallet.WalletCurrency)
            {
                newConvertedAmount = _repository.Convert(
                    Math.Abs(updatedTransaction.amount),
                    updatedTransaction.currency,
                    wallet.WalletCurrency
                );
                newConvertedAmount = updatedTransaction.amount < 0 ? -newConvertedAmount : newConvertedAmount;
            }
            updatedTransaction.ConvertedAmount = newConvertedAmount;

            wallet.Currency += newConvertedAmount;

            existingTransaction.amount = updatedTransaction.amount;
            existingTransaction.ConvertedAmount = updatedTransaction.ConvertedAmount;
            existingTransaction.Category = updatedTransaction.Category;
            existingTransaction.currency = updatedTransaction.currency;
            existingTransaction.date = updatedTransaction.date;
            existingTransaction.Type = updatedTransaction.Type;

            _context.SaveChanges();
            return Ok(existingTransaction);
        }

        [HttpDelete("{transactionID}")]
        public IActionResult DeleteTransactionById(int transactionID)
        {
            var transaction = _repository.DeleteTransaction(transactionID);
            return Ok(transaction);
        }

        [HttpGet("wallet/{walletID}/income-by-date")]
        public IActionResult GetIncomeByDate(int walletID)
        {
            var incomeByDate = _context.Transactions.Where(t => t.WalletID == walletID && t.Type == TransactionType.Income).AsEnumerable()
                                .GroupBy(t => t.date).Select(g => new
                                {
                                    date = g.Key.ToString("yyyy-MM-dd"),
                                    amount = g.Sum(t => t.ConvertedAmount)
                                }).OrderBy(x => x.date).ToList();
            return Ok(incomeByDate);
        }

        [HttpGet("wallet/{walletID}/expense-by-date")]
        public IActionResult GetExpenseByDate(int walletID)
        {
            var expenseByDate = _context.Transactions.Where(t => t.WalletID == walletID && t.Type == TransactionType.Expense).AsEnumerable()
                                .GroupBy(t => t.date).Select(g => new
                                {
                                    date = g.Key.ToString("yyyy-MM-dd"),
                                    amount = g.Sum(t => t.ConvertedAmount)
                                }).OrderBy(x => x.date).ToList();
            return Ok(expenseByDate);
        }

        [HttpGet("wallet/{walletID}/expense-by-category")]
        public IActionResult GetExpenseByCategory(int walletID)
        {
            var expenseByCategory = _context.Transactions.Where(t => t.WalletID == walletID && t.Type == TransactionType.Expense)
                                    .GroupBy(t => t.Category)
                                    .Select(g => new
                                    {
                                        category = g.Key,
                                        amount = g.Sum(t => t.ConvertedAmount)
                                    }).ToList();
            var totalExpense = expenseByCategory.Sum(x => x.amount);

            var result = expenseByCategory.Select(x => new
            {
                category = x.category,
                amount = x.amount,
                percentage = totalExpense == 0 ? 0 : (x.amount / totalExpense) * 100
            });

            return Ok(result);
        }
    }
}
