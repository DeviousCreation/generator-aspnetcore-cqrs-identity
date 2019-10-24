// TOKEN_COPYRIGHT_TEXT

using System;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Domain.Events
{
    public class PasswordResetTokenGeneratedEvent : INotification
    {
        public PasswordResetTokenGeneratedEvent(Guid userId, string token)
        {
            this.UserId = userId;
            this.Token = token;
        }

        public Guid UserId { get; }

        public string Token { get; }
    }
}