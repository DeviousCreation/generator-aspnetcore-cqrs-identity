using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class RequestPasswordResetCommand : IRequest<ResultWithError<ErrorData>>
    {
        public RequestPasswordResetCommand(string credential)
        {
            this.Credential = credential;
        }

        public string Credential { get; }
    }
}