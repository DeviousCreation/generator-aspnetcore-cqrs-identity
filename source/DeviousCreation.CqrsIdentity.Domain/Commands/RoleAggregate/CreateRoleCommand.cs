// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.RoleAggregate;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate
{
    public class CreateRoleCommand : IRequest<Result<CreateRoleCommandResult, ErrorData>>
    {
        private readonly List<Guid> _resources;

        public CreateRoleCommand(string name, List<Guid> resources)
        {
            this.Name = name;
            this._resources = resources;
        }

        public string Name { get; }

        public IReadOnlyList<Guid> Resources => this._resources.AsReadOnly();
    }
}