using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects.User
{
    public class DetailedUserDto
    {
        public string Username { get; set; }
        public string EmailAddress { get; set; }

        public bool IsAdmin { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public bool IsLockable { get; set; }
    }
}
