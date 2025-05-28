using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;
using BudgetManagmentServer.Data;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private IWalletRepository _walletRepository;
        private BudgetManagmentContext _context;
        public WalletController(IWalletRepository walletRepository, BudgetManagmentContext context)
        {
            _walletRepository = walletRepository;
            _context = context;
        }


       [HttpGet]
        public IActionResult GetAllWallets()
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

            var wallets = _walletRepository.GetAllWallet(userId);
            return Ok(wallets);
        }

        [HttpPost]
        public IActionResult CreateWallet(Wallet wallet)
        {
            int UserIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var walletCount = _context.Wallets.Where(w => w.userId == UserIdClaim).Count();
            if (UserIdClaim == null)
            {
                return BadRequest("User ID claim is missing");
            }
            else if (walletCount >= 5)
            {
                return BadRequest("Max wallets 5");
            }

            wallet.userId = UserIdClaim;
            
            var newWallet = _walletRepository.CreateWallet(wallet);

            return Ok(newWallet);
        }

        [HttpPost("{id}")]
        public IActionResult UpdateWallet(int id, Wallet wallet)
        {
            var updateWallet = _walletRepository.UpdateWallet(id, wallet);
            
            if (updateWallet == null)
            {
                return NotFound($"Wallet with id {id} not found.");
            }

            return Ok(updateWallet);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWallet(int id)
        {
           var delete = _walletRepository.DeleteWallet(id);

            return Ok(delete);
            
        }

        [HttpGet("exists")]
        public  IActionResult existWallet( [FromQuery] string walletName)
        {
            bool exist = _walletRepository.existWallet(walletName);
            
            return Ok(exist);
        }


       
    }
}
