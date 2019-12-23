// TOKEN_COPYRIGHT_TEXT

using System;

namespace DeviousCreation.CqrsIdentity.OData.User
{
    public class User
    {
        public Guid Id { get; set; }

        public string EmailAddress { get; set; }

        public string Username { get; set; }

        public bool IsVerified { get; set; }

        public bool IsLockable { get; set; }

        public bool IsLocked { get; set; }

        public DateTime? WhenSignedIn { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime WhenCreated { get; set; }
    }
}