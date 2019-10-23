using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.RoleAggregate
{
    public class CreateRoleCommandValidator : AbstractValidator<CreateRoleCommand>
    {
        public CreateRoleCommandValidator()
        {
            this.RuleFor(x => x.Name).NotEmpty().WithErrorCode(ValidationCodes.FieldIsRequired);
        }
    }
}