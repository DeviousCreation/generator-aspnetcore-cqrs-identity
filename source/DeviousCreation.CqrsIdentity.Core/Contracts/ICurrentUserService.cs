using System;
using System.Collections.Generic;
using System.Text;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface  ICurrentUserService
    {
        Maybe<CurrentUser> CurrentUser { get; }
    }

    public class CurrentUser
    {
        public CurrentUser(Guid userId)
        {
            this.UserId = userId;
        }

        public Guid UserId { get; }
    }
}
