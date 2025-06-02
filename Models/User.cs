
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Antiforgery;

namespace BudgetManagmentServer.Models
{
    public class User
    {
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(5)]
        public string Password { get; set; }

        public ICollection<Wallet>? Wallets { get; set; }
        public ICollection<Transaction>? Transactions { get; set; }
    }
}
