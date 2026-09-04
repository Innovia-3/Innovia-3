using System.ComponentModel.DataAnnotations;

namespace api.Dtos.UserDtos
{
    /* för admin vid skapande av ny användare */
    public class RegisterUserDto
    {   
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}