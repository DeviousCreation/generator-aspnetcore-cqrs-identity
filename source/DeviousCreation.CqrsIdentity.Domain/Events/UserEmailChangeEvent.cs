using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Domain.Events
{
    public class UserEmailChangeEvent : INotification
    {
        public UserEmailChangeEvent(Guid userId, string oldEmailAddress)
        {
            this.UserId = userId;
            this.OldEmailAddress = oldEmailAddress;
        }
        public Guid UserId { get; }
        public string OldEmailAddress { get; }
    }
}
