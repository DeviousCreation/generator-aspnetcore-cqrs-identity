using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Domain.Events
{
    public class MfaTokenGeneratedEvent : INotification
    {
        public MfaTokenGeneratedEvent(object requestTwoFactorProvider, Guid userId, string generated)
        {
            throw new NotImplementedException();
        }
    }
}
