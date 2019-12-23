using System;
using System.Text;
using System.Text.Encodings.Web;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Settings;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Domain
{
    public class DomainHelpers : IDomainHelpers
    {
        private const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";
        private readonly SiteSettings _siteSettings;

        private readonly UrlEncoder _urlEncoder;

        public DomainHelpers(UrlEncoder urlEncoder, IOptions<SiteSettings> siteSettings)
        {
            if (siteSettings == null)
            {
                throw new ArgumentNullException(nameof(siteSettings));
            }

            this._urlEncoder = urlEncoder ?? throw new ArgumentNullException(nameof(urlEncoder));
            this._siteSettings = siteSettings.Value;
        }

        public string FormatAuthenticatorAppKey(string base32Key)
        {
            var result = new StringBuilder();
            var currentPosition = 0;
            while (currentPosition + 4 < base32Key.Length)
            {
                result.Append(base32Key.Substring(currentPosition, 4)).Append(" ");
                currentPosition += 4;
            }

            if (currentPosition < base32Key.Length)
            {
                result.Append(base32Key.Substring(currentPosition));
            }

            return result.ToString().ToLowerInvariant();
        }

        public string GenerateAuthenticatorAppQrCodeUri(string username, string unformattedKey)
        {
            return string.Format(
                AuthenticatorUriFormat, this._urlEncoder.Encode(this._siteSettings.Name),
                this._urlEncoder.Encode(username),
                unformattedKey);
        }
    }
}