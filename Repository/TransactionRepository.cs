using BudgetManagmentServer.Data;
using BudgetManagmentServer.Models;
using Microsoft.VisualBasic;

namespace BudgetManagmentServer.Repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private BudgetManagmentContext _context;

        public TransactionRepository(BudgetManagmentContext context)
        {
            _context = context;
        }
        public IEnumerable<Transaction> GetAllTransaction(int userId)
        {
            return _context.Transactions.Where(t => t.UserID == userId);
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
            existTransaction.Category = transaction.Category;
            existTransaction.UserID = transaction.UserID;
            existTransaction.amount = transaction.amount;
            existTransaction.date = transaction.date;
            existTransaction.currency = transaction.currency;

            _context.SaveChanges();

            return existTransaction;
        }

        public Transaction DeleteTransaction(int id)
        {
            var transactionDelete = _context.Transactions.FirstOrDefault(t => t.TransactionID == id);
            var wallet = _context.Wallets.FirstOrDefault(w => w.WalletID == transactionDelete.WalletID);

            wallet.Currency -= transactionDelete.ConvertedAmount;            
            
            _context.Transactions.Remove(transactionDelete);
            _context.SaveChanges();

            return transactionDelete;
        }


        public float Convert(float amount, string fromCurrency, string toCurrency)
        {
            if (fromCurrency == toCurrency)
                return amount;

            float rate;

            if (fromCurrency == "EUR" && toCurrency == "PLN") rate = 4.29f;
            else if (fromCurrency == "USD" && toCurrency == "PLN") rate = 3.76f;
            else if (fromCurrency == "PLN" && toCurrency == "EUR") rate = 1f / 4.29f;
            else if (fromCurrency == "PLN" && toCurrency == "USD") rate = 1f / 3.76f;
            else if (fromCurrency == "EUR" && toCurrency == "USD") rate = 1.14f;
            else if (fromCurrency == "USD" && toCurrency == "EUR") rate = 1f / 1.14f;
            else
                throw new Exception("Unsupported currency pair");

            return amount * rate;



        }
    }
}