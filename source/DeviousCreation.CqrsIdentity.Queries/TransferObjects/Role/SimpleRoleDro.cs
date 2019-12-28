using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects.Role
{
    public class SimpleRoleDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
