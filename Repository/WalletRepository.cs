using BudgetManagmentServer.Data;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagmentServer.Repository
{
    public class WalletRepository : IWalletRepository
    {
        private BudgetManagmentContext _context;

        public WalletRepository(BudgetManagmentContext context)
        {
            _context = context ;
        }


        public IEnumerable<Wallet> GetAllWallet()
        {
            return _context.Wallets;
        }

        public Wallet GetWalletById(int id)
        {
            return _context.Wallets.Find(id);
        }

        public Wallet CreateWallet(Wallet wallet)
        {
            _context.Wallets.Add(wallet);
            _context.SaveChanges();
            return wallet;
        }

        public Wallet UpdateWallet(int id, Wallet wallet)
        {
            var existWallet = _context.Wallets.Find(id);

            existWallet.WalletName = wallet.WalletName;
            existWallet.Description = wallet.Description;
            existWallet.Currency = wallet.Currency;

            _context.SaveChanges();

            return existWallet;
        }

        public Wallet DeleteWallet(int id)
        {
            var deleteWallet = _context.Wallets.Find(id);

            _context.Remove(deleteWallet);
            _context.SaveChanges();

            return deleteWallet;

        }
    }
}

