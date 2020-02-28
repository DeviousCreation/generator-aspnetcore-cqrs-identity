// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class RequestAccountVerificationCommand : IRequest<ResultWithError<ErrorData>>
    {
        public RequestAccountVerificationCommand(string emailAddress)
        {
            this.EmailAddress = emailAddress;
        }

        public string EmailAddress { get; }
    }
}