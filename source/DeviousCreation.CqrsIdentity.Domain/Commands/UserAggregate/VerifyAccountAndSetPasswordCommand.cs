using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class VerifyAccountAndSetPasswordCommand : IRequest<ResultWithError<ErrorData>>
    {
        public VerifyAccountAndSetPasswordCommand(string token, string password)
        {
            this.Token = token;
            this.Password = password;
        }

        public string Token { get; }
        public string Password { get; }
    }
}