// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class LoginCommand : IRequest<Result<LoginCommandResult, ErrorData>>
    {
        public LoginCommand(string credential, string password)
        {
            this.Credential = credential;
            this.Password = password;
        }

        public string Credential { get; }

        public string Password { get; }
    }
}