using api.Dtos.UserDtos;
using api.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

/*         [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized("Fel email elelr lösenord");
            }

            var passwordCorrect = await _userRepository.CheckPasswordAsync(user, loginDto.Password);

            if (!passwordCorrect)
            {
                return Unauthorized("Fel email eller lösenord.");
            }

            /* ------ JWT token senare ------ 
            return Ok("Inloggning lyckades!");
        } */
    }
}

