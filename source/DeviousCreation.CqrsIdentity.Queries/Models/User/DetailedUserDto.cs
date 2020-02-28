using System;
using System.Collections.Generic;

namespace DeviousCreation.CqrsIdentity.Queries.Models.User
{
    public class DetailedUser
    {
        public DetailedUser(string username, string emailAddress, bool isAdmin, string firstName, string lastName, bool isLockable, List<Guid> roles)
        {
            this._roles = roles;
            this.Username = username;
            this.EmailAddress = emailAddress;
            this.IsAdmin = isAdmin;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.IsLockable = isLockable;
        }
        private readonly List<Guid> _roles;
        public string Username { get; }
        public string EmailAddress { get; }

        public bool IsAdmin { get; }

        public string FirstName { get; }
        public string LastName { get; }

        public IReadOnlyList<Guid> Roles => this._roles.AsReadOnly();

        public bool IsLockable { get; }
    }
}
