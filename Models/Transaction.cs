
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.Identity.Client;
using Microsoft.VisualBasic;


namespace BudgetManagmentServer.Models
{
    public class Transaction
    {
        public int TransactionID { get; set; }

        public string Category { get; set; }
        [Required]
        public TransactionType Type { get; set; }
        [Required]
        public float amount { get; set; }
        [Required]
        public DateOnly date { get; set; }
        [Required]
        public string currency { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
        public int UserID { get; set; }
        [JsonIgnore]
        public Wallet? Wallet { get; set; }
        public int WalletID { get; set; }
    }

    public enum TransactionType
    {
        Income = 0,
        Expense = 1
    }
}