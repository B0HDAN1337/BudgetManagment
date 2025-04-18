using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BudgetManagmentServer.Models;

namespace BudgetManagmentServer.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUser();
        User GetUserById(int id);
        User CreateUser(User user);
        User UpdateUser(int id, User user);
        User DeleteUser(int id);
        bool existUser(string username, string email);
    }
}
