using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class ValidateAuthenticatorAppCommand : IRequest<ResultWithError<ErrorData>>
    {
        public ValidateAuthenticatorAppCommand(string token)
        {
            this.Token = token;
        }
        public string Token { get; }
    }
}