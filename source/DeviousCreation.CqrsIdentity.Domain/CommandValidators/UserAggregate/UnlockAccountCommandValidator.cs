// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class UnlockAccountCommandValidator : AbstractValidator<UnlockAccountCommand>
    {
        public UnlockAccountCommandValidator()
        {
            this.RuleFor(x => x.UserId).NotEqual(Guid.Empty);
        }
    }
}