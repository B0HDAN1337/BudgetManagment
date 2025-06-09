using BudgetManagmentServer.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace BudgetManagmentServer.Repository
{
    public interface ISavingRepository
    {
        IEnumerable<Saving> GetAllSaving(int savingId);
        Saving GetSavingById(int id);
        Saving CreateSaving(Saving saving);
        Saving UpdateSaving(int id, Saving saving);
        Saving DeleteSaving(int id);
    }
}