using System;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.RoleAggregate
{
    public class CreateRoleCommandResult
    {

        public CreateRoleCommandResult(Guid roleId)
        {
            this.RoleId = roleId;

        }
        public Guid RoleId { get; }
    }
}