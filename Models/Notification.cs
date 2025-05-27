using Microsoft.Net.Http.Headers;

namespace BudgetManagmentServer.Models
{
    public class Notification
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public int message { get; set; }
    }
}