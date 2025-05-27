using BudgetManagmentServer.Models;


namespace BudgetManagmentServer.Repository
{
    public interface ITransactionRepository
    {
        IEnumerable<Transaction> GetAllTransaction();
        Transaction GetTransactionById(int id);
        Transaction CreateTransaction(Transaction transaction);
        Transaction UpdateTransaction(int id, Transaction transaction);
        Transaction DeleteTransaction(int id);
    }
}