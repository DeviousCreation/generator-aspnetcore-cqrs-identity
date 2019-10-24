// TOKEN_COPYRIGHT_TEXT

using System;

namespace DeviousCreation.CqrsIdentity.Core
{
    public class CurrentUser
    {
        public CurrentUser(Guid userId)
        {
            this.UserId = userId;
        }

        public Guid UserId { get; }
    }
}