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
            var transactionCount = _context.Transactions.Where(w => w.UserID == UserIdClaim).Count();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (UserIdClaim == null)
            {
                return BadRequest("User ID claim is missing");
            }

            var wallet = _context.Wallets.FirstOrDefault(w => w.WalletID == transaction.WalletID);
            if (wallet == null)
            {
                return BadRequest("Wallet ID missing");
            }

            transaction.Type = transaction.Category == "Income"
            ? TransactionType.Income
            : TransactionType.Expense;

            transaction.UserID = UserIdClaim;

            // Додаємо або віднімаємо з балансу гаманця
            if (transaction.Type == TransactionType.Income)
            {
                wallet.Currency += transaction.amount;
            }
            else
            {
                wallet.Currency -= transaction.amount;
            }

            var newTransaction = _repository.CreateTransaction(transaction);
            wallet.Currency += transaction.amount;
            _context.SaveChanges();
            return Ok(newTransaction);
        }

        [HttpGet("wallet/{walletID}")]
        public IActionResult GetTransactionByWallet(int walletID)
        {
            int userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var transactions = _context.Transactions.Where(t =>  t.WalletID == walletID).ToList();
            return Ok(transactions);
        }
    }
}
