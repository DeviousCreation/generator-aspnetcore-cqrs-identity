using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IPasswordHasher
    {
        bool ValidatePassword(string password, string passwordHash);
        string HashPassword(string password);
    }
}
