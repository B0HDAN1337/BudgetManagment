using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BudgetManagmentServer.Models;

namespace BudgetManagmentServer.Repository
{
    public interface IWalletRepository
    {
        IEnumerable<Wallet> GetAllWallet();
        Wallet GetWalletById(int id);
        Wallet CreateWallet(Wallet wallet);
        Wallet UpdateWallet(int id, Wallet wallet);
        Wallet DeleteWallet(int id);
        bool existWallet(string walletName);
    }
}
