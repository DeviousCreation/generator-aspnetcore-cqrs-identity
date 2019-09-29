using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            this.RuleFor(x => x.Credential).NotNull();
            this.RuleFor(x => x.Password).NotNull();
        }
    }
}
