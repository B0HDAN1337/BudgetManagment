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
        public IActionResult CreateTransaction(Transaction transaction)
        {
            int UserIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var transactionCount = _context.Transactions.Where(w => w.UserID == UserIdClaim).Count();
            if (UserIdClaim == null)
            {
                return BadRequest("User ID claim is missing");
            }
            
            if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

            transaction.UserID = UserIdClaim;

            var newTransaction = _repository.CreateTransaction(transaction);
            return Ok(newTransaction);
        }
    }
}
