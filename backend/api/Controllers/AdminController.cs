using api.Dtos.UserDtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
/* using Microsoft.AspNetCore.Authorization; används när JWT är implementerat */

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]

    /* [Authorize (Roles = "Admin")] läggs till när JWT är implementerat*/
    public class AdminController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public AdminController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                Email = registerUserDto.Email,
                UserName = registerUserDto.Email
            };

            var created = await _userRepository.CreateUserAsync(user, registerUserDto.Password);

            if (!created)
            {
                return BadRequest("Kunde inte skapa användare");
            }

            return Ok("Användaren skapades");
        }
    }
}