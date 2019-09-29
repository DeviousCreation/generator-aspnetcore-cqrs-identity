using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class RequestPasswordResetCommandValidator : AbstractValidator<RequestPasswordResetCommand>
    {
        public RequestPasswordResetCommandValidator()
        {
            this.RuleFor(x => x.Credential).NotNull();
        }
    }
}
