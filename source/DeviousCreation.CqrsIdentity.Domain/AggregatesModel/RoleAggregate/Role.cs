// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using System.Linq;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate
{
    public sealed class Role : Entity, IRole
    {
        private readonly List<RoleResource> _roleResources;
        public Role(Guid id, string name)
        {
            this.Id = id;
            this.Name = name;
            this._roleResources = new List<RoleResource>();
        }

        private Role()
        {
            this._roleResources = new List<RoleResource>();
        }

        public string Name { get; private set; }

        public IReadOnlyList<RoleResource> RoleResources => this._roleResources.AsReadOnly();

        public void FlagAsDeleted()
        {
            throw new NotImplementedException();
        }

        public void UpdateName(string name)
        {
            this.Name = name;
        }

        public void SetRoles(IReadOnlyList<Guid> roles)
        {
            this._roleResources.AddRange(roles.Select(x=> new RoleResource(x)));
        }
    }
}