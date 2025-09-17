using BudgetManagmentServer.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace BudgetManagmentServer.Repository
{
    public interface ITransactionRepository
    {
        IEnumerable<Transaction> GetAllTransaction(int userId);
        Transaction GetTransactionById(int id);
        Transaction CreateTransaction(Transaction transaction);
        Transaction UpdateTransaction(int id, Transaction transaction);
        Transaction DeleteTransaction(int id);

        float Convert(float amount, string fromCurrency, string toCurrency);
    }
}