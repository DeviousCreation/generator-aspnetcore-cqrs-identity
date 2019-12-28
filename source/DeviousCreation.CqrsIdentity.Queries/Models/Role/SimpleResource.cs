using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.Models.Role
{
    public class SimpleResource
    {
        private readonly List<SimpleResource> _simpleResources;
        public SimpleResource(Guid id, string name, Guid? parentId)
        {
            this.Id = id;
            this.Name = name;
            this.ParentId = parentId;
            this._simpleResources = new List<SimpleResource>();
        }

        public Guid Id { get; }
        public string Name { get; }
        internal Guid? ParentId { get; }

        public IReadOnlyList<SimpleResource> SimpleResources => this._simpleResources.AsReadOnly();

        internal void SetSimpleResources(List<SimpleResource> simpleResources)
        {
            this._simpleResources.AddRange(simpleResources);
        }
    }
}
