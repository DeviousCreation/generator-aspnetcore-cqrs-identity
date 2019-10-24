// TOKEN_COPYRIGHT_TEXT

using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.Registration
{
    public class RegisterModelValidator : AbstractValidator<RegisterModel>
    {
        public RegisterModelValidator()
        {
            this.RuleFor(x => x.Username).NotEmpty();
            this.RuleFor(x => x.EmailAddress).EmailAddress().NotEmpty();
        }
    }
}