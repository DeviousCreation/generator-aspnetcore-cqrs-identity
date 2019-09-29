using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
    {
        public ResetPasswordCommandValidator()
        {
            this.RuleFor(x => x.Token).NotNull();
            this.RuleFor(x => x.NewPassword).NotNull();
        }
    }
}
