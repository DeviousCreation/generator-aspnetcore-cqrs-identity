// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class LoginCommand : IRequest<Result<LoginCommandResult, ErrorData>>
    {
        public LoginCommand(string emailAddress, string password)
        {
            this.EmailAddress = emailAddress;
            this.Password = password;
        }

        public string EmailAddress { get; }

        public string Password { get; }
    }
}