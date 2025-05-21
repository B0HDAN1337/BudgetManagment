using BudgetManagmentServer.Repository;
using BudgetManagmentServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

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

        [Authorize]
        [HttpDelete("delete")]
        public IActionResult DeleteUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized();    
            }

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid user ID");
            }

            var delete = _userRepository.DeleteUser(userId);

            if (delete == null)
            {
                return NotFound("User not found or already deleted");
            }

            return Ok();

        }

        [HttpGet("exists")]
        public IActionResult CheckUser([FromQuery] string username, [FromQuery] string email)
        {
            bool exist = _userRepository.existUser(username, email);
            return Ok(exist);
        }


        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var userLogin = _userRepository.LoginUser(user);

            if (userLogin == null)
            {
                return Unauthorized();
            }

            var claim = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userLogin.UserID.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, userLogin.UserName),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("keyGenerationTokenForUserIdentification"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "BudgetManagment-app",
                audience: "BudgetManagment-app",
                claims: claim,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                userid = userLogin.UserID,
                username = userLogin.UserName
            });
        }

        [Authorize]
        [HttpGet("getdata")]
        public IActionResult GetData()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            var userData = new
            {
                ID = id,
                Email = email,
                name = username 
            };

            return Ok(userData);
        }

    }
}
