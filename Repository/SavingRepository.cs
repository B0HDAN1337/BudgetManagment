using BudgetManagmentServer.Data;
using BudgetManagmentServer.Models;
using Microsoft.VisualBasic;

namespace BudgetManagmentServer.Repository
{
    public class SavingRepository : ISavingRepository
    {
        private BudgetManagmentContext _context;
        public SavingRepository(BudgetManagmentContext context)
        {
            _context = context;
        }
        public IEnumerable<Saving> GetAllSaving(int savingId)
        {
            return _context.Savings;
        }
         public Saving GetSavingById(int id)
        {
            return _context.Savings.Find(id);
        }
        public Saving CreateSaving(Saving saving)
        {
            _context.Savings.Add(saving);
            _context.SaveChanges();
            return saving;
        }
        public Saving UpdateSaving(int id, Saving saving)
        {
            var existSaving = _context.Savings.Find(id);

            existSaving.SavingID = saving.SavingID;
            existSaving.SavingName = saving.SavingName;
            existSaving.Description = saving.Description;
            existSaving.GoalDate = saving.GoalDate;
            existSaving.amountSave = saving.amountSave;
            existSaving.Currency = saving.Currency;
            existSaving.WalletID = saving.WalletID;
            existSaving.UserID = saving.UserID;

            return existSaving;
        }

        public Saving DeleteSaving(int id)
        {
            var existSaving = _context.Savings.Find(id);

            _context.Remove(existSaving);

            return existSaving;
        } 
    }
}