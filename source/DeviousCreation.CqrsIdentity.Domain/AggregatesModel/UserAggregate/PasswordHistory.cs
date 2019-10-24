// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class PasswordHistory : Entity
    {
        public PasswordHistory(Guid id, string passwordHash, DateTime whenUsed)
        {
            this.Id = id;
            this.WhenUsed = whenUsed;
            this.PasswordHash = passwordHash;
        }

        private PasswordHistory()
        {
        }

        public string PasswordHash { get; private set; }

        public DateTime WhenUsed { get; private set; }
    }
}