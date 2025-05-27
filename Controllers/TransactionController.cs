using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private ITransactionRepository _transactionRepository;
        public TransactionController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }
        [HttpGet]
        public IActionResult GetAllTransactios()
        {
            var existTransactions = _transactionRepository.GetAllTransaction();
            return Ok(existTransactions);
        }
        [HttpGet("id")]
        public Transaction GetTransactionById(int id)
        {
            throw new NotImplementedException();
        }
        [HttpPost]
        public Transaction CreateTransaction(Transaction transaction)
        {
            throw new NotImplementedException();
        }
        [HttpPost("id")]
        public Transaction UpdateTransaction(int id, Transaction transaction)
        {
            throw new NotImplementedException();
        }
        [HttpDelete("id")]
        public Transaction DeleteTransaction(int id)
        {
            throw new NotImplementedException();
        }
    }
}