
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Identity.Client;

namespace BudgetManagmentServer.Models
{
    public class Wallet
    {
        public int WalletID { get; set; }
        [Required]
        public string WalletName { get; set; }
        public string Description { get; set; }
        [Required]
        [Range(1.0, float.MaxValue, ErrorMessage = "Must be > 0")]
        public float Currency { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public int userId { get; set; }
    }
}
