using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate
{
    public class RoleResource : Entity
    {
        public RoleResource(Guid id)
        {
            this.Id = id;
        }

        private RoleResource()
        {
        }
    }
}
