// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate
{
    public class DeleteRoleCommand : IRequest<ResultWithError<ErrorData>>
    {
        public DeleteRoleCommand(Guid roleId)
        {
            this.RoleId = roleId;
        }

        public Guid RoleId { get; }
    }
}