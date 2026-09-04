using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        /* hämta användare via email */
        Task<User?> GetByEmailAsync(string email);

        /* kontrollera ifall lösenord är korrekt */
        Task<bool> CheckPasswordAsync(User user, string password);

        /* skapa ny användare */
        Task<bool> CreateUserAsync(User user, string password);
    }   
}