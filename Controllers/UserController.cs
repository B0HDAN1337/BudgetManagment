using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BudgetManagmentServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUser();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);
            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            
            var newUser = _userRepository.CreateUser(user);

            return Ok(newUser);
        }

        [HttpPost("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            var updateUser = _userRepository.UpdateUser(id, user);
            
            if (updateUser == null)
            {
                return NotFound($"User with id {id} not found.");
            }

            return Ok(updateUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
           var delete = _userRepository.DeleteUser(id);

            return Ok(delete);
            
        }

        [HttpGet("exists")]
        public IActionResult CheckUser([FromQuery] string username, [FromQuery] string email)
        {
            bool exist = _userRepository.existUser(username, email);
            return Ok(exist);
        }


        [HttpPost("login")]
        public IActionResult LoginUser(User user)
        {
            var userLogin = _userRepository.LoginUser(user);
            
            if (userLogin == null)
            {
                return Unauthorized();
            }

            return Ok();
        }

    }
}
