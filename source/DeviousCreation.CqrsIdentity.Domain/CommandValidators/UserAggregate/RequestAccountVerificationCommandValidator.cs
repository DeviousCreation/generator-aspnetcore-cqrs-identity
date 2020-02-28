// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class RequestAccountVerificationCommandValidator : AbstractValidator<RequestAccountVerificationCommand>
    {
        public RequestAccountVerificationCommandValidator()
        {
            this.RuleFor(x => x.EmailAddress).NotEmpty();
        }
    }
}