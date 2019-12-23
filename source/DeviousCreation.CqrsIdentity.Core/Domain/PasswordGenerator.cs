using System;
using System.Security.Cryptography;
using DeviousCreation.CqrsIdentity.Core.Contracts;

namespace DeviousCreation.CqrsIdentity.Core.Domain
{
    public class PasswordGenerator : IPasswordGenerator
    {
        public string Generate()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                var data = new byte[256];
                rng.GetBytes(data);
                return Convert.ToBase64String(data);
            }
        }
    }
}