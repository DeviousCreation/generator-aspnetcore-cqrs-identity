// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.RoleAggregate
{
    public class UpdateRoleNameCommandValidator : AbstractValidator<UpdateRoleNameCommand>
    {
        public UpdateRoleNameCommandValidator()
        {
            this.RuleFor(x => x.Name).NotEmpty().WithErrorCode(ValidationCodes.FieldIsRequired);
            this.RuleFor(x => x.RoleId).NotEqual(Guid.Empty).WithErrorCode(ValidationCodes.FieldIsRequired);
        }
    }
}