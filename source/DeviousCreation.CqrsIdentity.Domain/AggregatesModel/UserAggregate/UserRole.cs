using System;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class UserRole : Entity
    {
        public UserRole(Guid id)
        {
            this.Id = id;
        }

        private UserRole()
        {
        }
    }
}