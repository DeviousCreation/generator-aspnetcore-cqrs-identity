using System;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class LockAccountCommand : IRequest<ResultWithError<ErrorData>>
    {
        public LockAccountCommand(Guid userId)
        {
            this.UserId = userId;
        }

        public Guid UserId { get; }
    }
}