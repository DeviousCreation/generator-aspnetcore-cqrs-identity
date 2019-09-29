using System;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class UnlockAccountCommand : IRequest<ResultWithError<ErrorData>>
    {
        public UnlockAccountCommand(Guid userId)
        {
            this.UserId = userId;
        }

        public Guid UserId { get; }
    }
}