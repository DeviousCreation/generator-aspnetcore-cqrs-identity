// TOKEN_COPYRIGHT_TEXT

using System;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Domain.Events
{
    public class GenerateAccountConfirmationTokenGeneratedEvent : INotification
    {
        public GenerateAccountConfirmationTokenGeneratedEvent(Guid userId, string token)
        {
            this.UserId = userId;
            this.Token = token;
        }

        public Guid UserId { get; }

        public string Token { get; }
    }
}