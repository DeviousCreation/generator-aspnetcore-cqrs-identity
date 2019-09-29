using System;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class Profile : Entity
    {
        public Profile(Guid id, string firstName, string lastName)
        {
            this.Id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
        }

        private Profile()
        {
        }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public void UpdateProfile(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
        }
    }
}