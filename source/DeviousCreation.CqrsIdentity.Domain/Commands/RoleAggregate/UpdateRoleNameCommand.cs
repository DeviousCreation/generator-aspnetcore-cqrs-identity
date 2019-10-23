using System;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate
{
    public class UpdateRoleNameCommand : IRequest<ResultWithError<ErrorData>>
    {
        public UpdateRoleNameCommand(Guid roleId, string name)
        {
            this.RoleId = roleId;
            this.Name = name;

        }
        
        public Guid RoleId { get; }
        public string Name { get; }
    }
}