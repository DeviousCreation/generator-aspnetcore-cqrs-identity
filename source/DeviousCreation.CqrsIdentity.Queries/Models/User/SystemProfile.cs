using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.Models.User
{
    public class SystemProfile
    {
        public SystemProfile(string emailAddress, string firstName, string lastName, string username)
        {
            this.EmailAddress = emailAddress;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Username = username;
        }

        public string EmailAddress { get; }

        public string FirstName { get; }

        public string LastName { get; }

        public string Username { get; }
    }
}
