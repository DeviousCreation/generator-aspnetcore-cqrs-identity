using System;
using System.Collections.Generic;

namespace DeviousCreation.CqrsIdentity.Queries.Models.Role
{
    public class DetailedRole
    {
        private readonly List<Guid> _resources;
        public DetailedRole(Guid id, string name, List<Guid> resources)
        {
            this.Id = id;
            this.Name = name;
            this._resources = resources;
        }

        public Guid Id { get; }
        public string Name { get; }

        public IReadOnlyList<Guid> Resources => this._resources.AsReadOnly();
    }
}
