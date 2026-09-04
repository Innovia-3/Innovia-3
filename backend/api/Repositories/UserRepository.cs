using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        /* UserManager från Identity för att hantera användare */
        private readonly UserManager<User> _userManager;

        /* hämtar UserManager genom dependency injection */
        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        /* letar efter användare med hjälp av email */
        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        /* kollar om lösenord stämmer för en användare */
        public async Task<bool> CheckPasswordAsync(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        /* skapar en ny användare med Identity */
        public async Task<bool> CreateUserAsync(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);

            /* returnerar true om användare lyckas skapas */
            return result.Succeeded;
        }
    }
}