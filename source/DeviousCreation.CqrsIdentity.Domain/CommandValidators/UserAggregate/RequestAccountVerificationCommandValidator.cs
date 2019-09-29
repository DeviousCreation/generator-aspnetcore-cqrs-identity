using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class RequestAccountVerificationCommandValidator : AbstractValidator<RequestAccountVerificationCommand>
    {
        public RequestAccountVerificationCommandValidator()
        {
            this.RuleFor(x => x.Credential).NotEmpty();
        }
    }
}
