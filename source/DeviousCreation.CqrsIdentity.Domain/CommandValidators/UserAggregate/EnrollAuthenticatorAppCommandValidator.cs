using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class EnrollAuthenticatorAppCommandValidator : AbstractValidator<EnrollAuthenticatorAppCommand>
    {
    }

    public class RevokeAuthenticatorAppCommandValidator : AbstractValidator<RevokeAuthenticatorAppCommand>
    {
    }

    public class ValidateAuthenticatorAppCommandValidator : AbstractValidator<ValidateAuthenticatorAppCommand>
    {
    }
}
