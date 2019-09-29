using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class VerifyAccountAndSetPasswordCommandValidator : AbstractValidator<VerifyAccountAndSetPasswordCommand>
    {
        public VerifyAccountAndSetPasswordCommandValidator()
        {
            this.RuleFor(x => x.Token).NotEmpty();
            this.RuleFor(x => x.Password).NotEmpty();
        }
    }
}
