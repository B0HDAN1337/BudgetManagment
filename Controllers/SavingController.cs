using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;
using BudgetManagmentServer.Data;
using Microsoft.AspNetCore.Authorization;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SavingController : ControllerBase
    {
        private ISavingRepository _savingRepository;
        private BudgetManagmentContext _context;
        public SavingController(ISavingRepository savingRepository, BudgetManagmentContext context)
        {
            _savingRepository = savingRepository;
            _context = context;
        }


        [HttpGet]
        public IActionResult GetAllSavings()
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

            var savings = _savingRepository.GetAllSaving(userId);
            return Ok(savings);
        }

        [HttpPost]
        public IActionResult CreateSaving([FromBody] Saving saving)
        {
            int UserIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var savingCount = _context.Savings.Where(s => s.UserID == UserIdClaim).Count();
            if (UserIdClaim == null)
            {
                return BadRequest("User ID claim is missing");
            }
            else if (savingCount >= 5)
            {
                return BadRequest("Max saving 5");
            }

            saving.UserID = UserIdClaim;

            var newSaving = _savingRepository.CreateSaving(saving);

            return Ok(newSaving);
        }

        [HttpGet("{id}")]
        public IActionResult GetWalletById(int id)
        {
            var saving = _savingRepository.GetSavingById(id);
            if (saving == null) return NotFound();
            return Ok(saving);
        }

        [HttpPost("{id}")]
        public IActionResult UpdateWallet(int id, Saving saving)
        {
            var updateSaving = _savingRepository.UpdateSaving(id, saving);

            if (updateSaving == null)
            {
                return NotFound($"Wallet with id {id} not found.");
            }

            return Ok(updateSaving);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWallet(int id)
        {
            var delete = _savingRepository.DeleteSaving(id);

            return Ok(delete);

        }

    }
}
