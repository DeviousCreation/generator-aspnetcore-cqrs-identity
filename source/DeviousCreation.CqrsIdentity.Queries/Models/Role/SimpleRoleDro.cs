using System;

namespace DeviousCreation.CqrsIdentity.Queries.Models.Role
{
    public class SimpleRole
    {
        public SimpleRole(Guid id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
        public Guid Id { get; }
        public string Name { get; }
    }
}
