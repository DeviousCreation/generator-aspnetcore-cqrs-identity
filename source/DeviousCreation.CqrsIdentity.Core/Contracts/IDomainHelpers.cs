using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IDomainHelpers
    {
        string FormatAuthenticatorAppKey(string base32Key);
        string GenerateAuthenticatorAppQrCodeUri(string email, string unformattedKey);
    }
}
