using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class LockAccountCommandValidator : AbstractValidator<LockAccountCommand>
    {
        public LockAccountCommandValidator()
        {
            this.RuleFor(x => x.UserId).NotEqual(Guid.Empty);
        }
    }
}
