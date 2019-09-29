using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Domain.Events
{
    public class AccountLockedEvent : INotification
    {
    }public class GenerateAccountConfirmationTokenGeneratedEvent : INotification
    {
    }
    public class PasswordResetTokenGeneratedEvent : INotification
    {
        public Guid UserId { get; }
        public string Token { get; }


        public PasswordResetTokenGeneratedEvent(Guid userId, string token)
        {
            this.UserId = userId;
            this.Token = token;
        }
    }
}
