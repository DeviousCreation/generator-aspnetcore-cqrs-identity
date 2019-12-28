using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.Models.User
{
    public class SystemProfile
    {
        private readonly List<string> _resources;

        public SystemProfile(string emailAddress, string firstName, string lastName, string username, bool isAdmin, List<string> resources)
        {
            this._resources = resources;
            this.EmailAddress = emailAddress;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
            this.IsAdmin = isAdmin;
        }

        

        public string EmailAddress { get; }

        public string FirstName { get; }

        public string LastName { get; }

        public string Username { get; }

        public bool IsAdmin { get; }

        public IReadOnlyList<string> Resources => this._resources;
    }
}
