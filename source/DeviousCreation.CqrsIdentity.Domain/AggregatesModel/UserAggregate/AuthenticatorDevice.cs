using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class AuthenticatorDevice : Entity
    {
        private AuthenticatorDevice()
        {

        }

        public AuthenticatorDevice(Guid id, DateTime whenEnrolled, byte[] publicKey, byte[] credentialId, Guid aaguid, int counter, string name, string credType)
        {
            this.Id = id;
            this.WhenEnrolled = whenEnrolled;
            this.PublicKey = publicKey;
            this.CredentialId = credentialId;
            this.Aaguid = aaguid;
            this.Counter = counter;
            this.Name = name;
            this.CredType = credType;
        }

        public DateTime WhenEnrolled { get; private set; }

        public DateTime? WhenRevoked { get; private set; }

        public byte[] PublicKey { get; private set; }

        public byte[] CredentialId { get; private set; }

        public Guid Aaguid { get; private set; }

        public int Counter { get; private set; }

        public string Name { get; private set; }

        public string CredType { get; private set; }

        public void RevokeDevice(DateTime whenRevoked)
        {
            this.WhenRevoked = whenRevoked;
        }

        public void UpdateCounter(int counter)
        {
            this.Counter = counter;
        }
    }
}
