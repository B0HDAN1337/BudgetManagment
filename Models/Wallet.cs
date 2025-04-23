
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Antiforgery;

namespace BudgetManagmentServer.Models
{
    public class Wallet
    {
        public int WalletID { get; set; }
        [Required]
        public string WalletName { get; set; }
        public string Description { get; set; }
        [Required]
        [Range(1.0, float.MaxValue, ErrorMessage ="Must be > 0")]
        public float Currency { get; set; }
    }
}
