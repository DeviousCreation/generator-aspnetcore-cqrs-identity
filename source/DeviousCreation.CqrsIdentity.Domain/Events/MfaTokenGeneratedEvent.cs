using System;
using DeviousCreation.CqrsIdentity.Core.Constants;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Domain.Events
{
    public class MfaTokenGeneratedEvent : INotification
    {
        private readonly string _code;

        public MfaTokenGeneratedEvent(RemoteMfaType twoFactorProvider, Guid userId, string code)
        {
            this._code = code;
            this.TwoFactorProvider = twoFactorProvider;
            this.UserId = userId;
        }

        public RemoteMfaType TwoFactorProvider { get; }

        public Guid UserId { get; }
    }
}