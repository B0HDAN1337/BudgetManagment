
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.Identity.Client;
using Microsoft.VisualBasic;


namespace BudgetManagmentServer.Models
{
    public class Saving
    {
        public int SavingID { get; set; }
        [Required]
        public string SavingName { get; set; }
        public string Description { get; set; }
        [Required]
        public DateOnly GoalDate { get; set; }
        [Required]
        public float amountSave { get; set; }
        [Required]
        public string Currency { get; set; }
        [JsonIgnore]
        public Wallet? Wallet { get; set; }
        public int WalletID { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public int UserID { get; set; }
    }
}