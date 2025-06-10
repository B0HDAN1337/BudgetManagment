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
        [HttpPost]
        public IActionResult CreateTransaction([FromBody] Transaction transaction)
        {
            int UserIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            transaction.UserID = UserIdClaim;

            if (UserIdClaim == null)
            {
                return BadRequest("User ID claim is missing");
            }

            

            var wallet = _context.Wallets.FirstOrDefault(w => w.WalletID == transaction.WalletID);
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
        public IActionResult UpdateTransactionById(int transactionID, Transaction transaction)
        {
            var transactions = _repository.UpdateTransaction(transactionID, transaction);
            if (transactions == null)
            {
                return NotFound($"Transaction with id {transactionID} not found.");
            }

            return Ok(transaction);
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
                                    amount = g.Sum(t => t.amount)
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
                                    amount = g.Sum(t => t.amount)
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
                                        amount = g.Sum(t => t.amount)
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
