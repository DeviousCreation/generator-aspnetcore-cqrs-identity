using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;

namespace DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate
{
    public class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
    {
        public UpdateProfileCommandValidator()
        {
            this.RuleFor(x => x.UserId).NotEqual(Guid.Empty);
            this.RuleFor(x => x.FirstName).NotEmpty();
            this.RuleFor(x => x.LastName).NotEmpty();
        }
    }
}
