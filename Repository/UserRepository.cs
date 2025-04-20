using BudgetManagmentServer.Data;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagmentServer.Repository
{
    public class UserRepository : IUserRepository
    {
        private BudgetManagmentContext _context;
        
        public UserRepository(BudgetManagmentContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUser()
        {
            return _context.Users;
        }
        public User GetUserById(int id)
        {
            return _context.Users.Find(id);
        }
        public User CreateUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }
        public User UpdateUser(int id, User user)
        {
            var existUser = _context.Users.Find(id);

            existUser.UserName = user.UserName;
            existUser.Email = user.Email;
            existUser.Password = user.Password;

            _context.SaveChanges();
            return existUser;
        }

        public User DeleteUser(int id)
        {
            var userDelete = _context.Users.Find(id);
            _context.Users.Remove(userDelete);

            _context.SaveChanges();
            return userDelete;
        } 

        public bool existUser(string username, string email)
        {
            return _context.Users.Any(u=> u.UserName == username || u.Email == email);
        }

        public User LoginUser(User user)
        {
            var userLogin = _context.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);
        
            return userLogin;
            
        }
    }
}
