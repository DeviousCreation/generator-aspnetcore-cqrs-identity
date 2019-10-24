// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class SignInHistory : Entity
    {
        public SignInHistory(Guid id, DateTime whenHappened, SignInHistoryType signInHistoryType)
        {
            this.Id = id;
            this.WhenHappened = whenHappened;
            this.SignInHistoryType = signInHistoryType;
        }

        private SignInHistory()
        {
        }

        public DateTime WhenHappened { get; private set; }

        public SignInHistoryType SignInHistoryType { get; private set; }
    }
}