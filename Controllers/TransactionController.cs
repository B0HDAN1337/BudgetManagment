using Microsoft.AspNetCore.Mvc;
using BudgetManagmentServer.Models;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/transactions")]
    public class TransactionsController : ControllerBase
    {
        private static List<Transaction> transactions = new();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(transactions.OrderByDescending(t => t.date).Take(7));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Transaction transaction)
        {
            transactions.Add(transaction);
            return Ok(transaction);
        }
    }
}
