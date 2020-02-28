// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate
{
    public class UpdateRoleCommand : IRequest<ResultWithError<ErrorData>>
    {
        private readonly List<Guid> _resources;

        public UpdateRoleCommand(Guid roleId, string name, List<Guid> resources)
        {
            this._resources = resources;
            this.RoleId = roleId;
            this.Name = name;
        }

        public Guid RoleId { get; }

        public string Name { get; }

        public IReadOnlyList<Guid> Resources => this._resources.AsReadOnly();
    }
}