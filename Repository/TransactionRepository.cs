using BudgetManagmentServer.Data;
using BudgetManagmentServer.Models;

namespace BudgetManagmentServer.Repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private BudgetManagmentContext _context;

        public TransactionRepository(BudgetManagmentContext context)
        {
            _context = context;
        }
        public IEnumerable<Transaction> GetAllTransaction()
        {
            return _context.Transactions;
        }
        public Transaction GetTransactionById(int id)
        {
            return _context.Transactions.Find(id);
        }
        public Transaction CreateTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
            return transaction;
        }
        public Transaction UpdateTransaction(int id, Transaction transaction)
        {
            var existTransaction = _context.Transactions.Find(id);

            existTransaction.TransactionID = transaction.TransactionID;
            existTransaction.CategoryID = transaction.CategoryID;
            existTransaction.UserID = transaction.UserID;
            existTransaction.amount = transaction.amount;
            existTransaction.date = transaction.date;
            existTransaction.currency = transaction.currency;

            _context.SaveChanges();

            return existTransaction;
        }

        public Transaction DeleteTransaction(int id)
        {
            var transactionDelete = _context.Transactions.Find(id);
            _context.Transactions.Remove(transactionDelete);

            return transactionDelete;
        }

    }
}