using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private IWalletRepository _walletRepository;
        public WalletController(IWalletRepository walletRepository)
        {
            _walletRepository = walletRepository;
        }


       [HttpGet]
        public IActionResult GetAllWallets()
        {
            var wallets = _walletRepository.GetAllWallet();
            return Ok(wallets);
        }

        [HttpGet("{id}")]
        public IActionResult GetWalletById(int id)
        {
            var wallet = _walletRepository.GetWalletById(id);
            return Ok(wallet);
        }

        [HttpPost]
        public IActionResult CreateWallet(Wallet wallet)
        {
            
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
