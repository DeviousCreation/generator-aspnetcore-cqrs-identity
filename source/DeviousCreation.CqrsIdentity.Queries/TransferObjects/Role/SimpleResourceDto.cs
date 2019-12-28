using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects.Role
{
    public class SimpleResourceDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ParentResourceId { get; set; }

        public List<SimpleResourceDto> Children { get; set; }
    }
}
