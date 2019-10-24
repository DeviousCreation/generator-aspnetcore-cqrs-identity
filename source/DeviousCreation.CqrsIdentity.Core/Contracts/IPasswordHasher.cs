// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IPasswordHasher
    {
        bool ValidatePassword(string password, string passwordHash);

        string HashPassword(string password);
    }
}