
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BudgetManagmentServer.Models
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TransactionID { get; set; }

        public int UserID { get; set; }
        public int CategoryID { get; set; }
        [Range(0.1, 100000)]
        public float amount { get; set; }
        public DateOnly date { get; set; }
        public string currency { get; set; }
    }
}