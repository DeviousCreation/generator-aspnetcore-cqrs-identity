// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core.Settings;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.SignIn
{
    public class SignInValidator : AbstractValidator<SignInModel>
    {
        public SignInValidator(IOptions<IdentitySettings> identitySettings)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            if (identitySettings.Value.UseEmailAddressAsUsername)
            {
                this.RuleFor(x => x.Credential).NotEmpty().EmailAddress();
            }
            else
            {
                this.RuleFor(x => x.Credential).NotEmpty();
            }

            this.RuleFor(x => x.Password).NotEmpty();
        }
    }
}