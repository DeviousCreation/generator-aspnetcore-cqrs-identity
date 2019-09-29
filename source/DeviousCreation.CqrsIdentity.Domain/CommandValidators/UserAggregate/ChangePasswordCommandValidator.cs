using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordCommandValidator()
        {
            this.RuleFor(x => x.CurrentPassword).NotEmpty().WithErrorCode(ValidationCodes.FieldIsRequired);
            this.RuleFor(x => x.NewPassword).NotEmpty().WithErrorCode(ValidationCodes.FieldIsRequired);
        }
    }
}
