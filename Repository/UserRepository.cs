using BudgetManagmentServer.Data;
using BudgetManagmentServer.Models;

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

            existUser.Name = user.Name;
            existUser.LastName = user.LastName;
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
    }
}
