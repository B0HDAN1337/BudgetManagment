
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
        [Range(0.1, 100000)]
        public float amount { get; set; }
        [Required]
        public DateOnly date { get; set; }
        [Required]
        public string currency { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
        public int UserID { get; set; }

        
        
    }
}