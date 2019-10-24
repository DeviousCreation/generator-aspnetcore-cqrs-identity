// TOKEN_COPYRIGHT_TEXT

using System;
using System.Security.Cryptography;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class SecurityTokenMapping : Entity
    {
        public SecurityTokenMapping(Guid id, SecurityTokenPurpose purpose, DateTime whenCreated, DateTime whenExpires)
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                var data = new byte[512];
                rng.GetBytes(data);
                this.Token = Convert.ToBase64String(data);
            }

            this.Id = id;
            this.Purpose = purpose;
            this.WhenCreated = whenCreated;
            this.WhenExpires = whenExpires;
        }

        private SecurityTokenMapping()
        {
        }

        public string Token { get; private set; }

        public SecurityTokenPurpose Purpose { get; private set; }

        public DateTime WhenCreated { get; private set; }

        public DateTime WhenExpires { get; private set; }

        public DateTime? WhenUsed { get; private set; }

        public void MarkUsed(DateTime usedOn)
        {
            this.WhenUsed = usedOn;
        }
    }
}