// TOKEN_COPYRIGHT_TEXT

using System;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate
{
    public class CreateUserCommandResult
    {
        public CreateUserCommandResult(Guid userId)
        {
            this.UserId = userId;
        }

        public Guid UserId { get; }
    }
}