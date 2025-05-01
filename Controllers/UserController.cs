using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

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
        public IActionResult LoginUser( [FromBody] User user)
        {
            var userLogin = _userRepository.LoginUser(user);
            
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userLogin == null)
            {
                return Unauthorized();
            }

            var claim = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userLogin.UserID.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KEY-TOKEN-FOR-USER-AUTHORIZE"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.Aes128CbcHmacSha256);

            var token = new JwtSecurityToken(
                issuer: "BudgetManagment-app",
                audience: "BudgetManagment-app",
                claims: claim,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return Ok( new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                userid = claim
            });
        }

    }
}
