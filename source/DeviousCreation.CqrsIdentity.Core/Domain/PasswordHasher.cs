// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core.Contracts;

namespace DeviousCreation.CqrsIdentity.Core.Domain
{
    public class PasswordHasher : IPasswordHasher
    {
        public bool ValidatePassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}