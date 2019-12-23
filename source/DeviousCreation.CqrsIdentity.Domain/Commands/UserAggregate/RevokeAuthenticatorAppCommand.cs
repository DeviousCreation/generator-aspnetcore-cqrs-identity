using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class RevokeAuthenticatorAppCommand : IRequest<ResultWithError<ErrorData>>
    {
        
    }
}