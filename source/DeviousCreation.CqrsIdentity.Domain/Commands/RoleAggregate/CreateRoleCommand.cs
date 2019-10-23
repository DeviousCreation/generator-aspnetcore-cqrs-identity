using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.RoleAggregate;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate
{
    public class CreateRoleCommand : IRequest<Result<CreateRoleCommandResult, ErrorData>>
    {
        public CreateRoleCommand(string name)
        {
            this.Name = name;

        }

        public string Name { get; }
    }
}
