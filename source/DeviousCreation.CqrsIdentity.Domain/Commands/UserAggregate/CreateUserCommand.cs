// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class CreateUserCommand : IRequest<ResultWithError<ErrorData>>
    {
        public CreateUserCommand(string emailAddress, string username, bool isLockable)
        {
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.IsLockable = isLockable;
        }

        public string EmailAddress { get; }

        public string Username { get; }

        public bool IsLockable { get; }
    }
}