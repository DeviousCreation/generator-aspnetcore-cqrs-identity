// TOKEN_COPYRIGHT_TEXT

using System;

namespace DeviousCreation.CqrsIdentity.Core
{
    public class CurrentUser
    {
        public CurrentUser(Guid userId, string emailAddress, string username, bool isAdmin)
        {
            this.UserId = userId;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.IsAdmin = isAdmin;
        }

        public CurrentUser(Guid userId)
        {
            this.UserId = userId;
        }

        public Guid UserId { get; }

        public string EmailAddress { get; }

        public string Username { get; }

        public bool IsAdmin { get; }
    }
}