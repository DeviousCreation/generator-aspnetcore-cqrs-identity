using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class RequestAccountVerificationCommand : IRequest<ResultWithError<ErrorData>>
    {
        public RequestAccountVerificationCommand(string credential)
        {
            this.Credential = credential;
        }

        public string Credential { get; }
    }
}