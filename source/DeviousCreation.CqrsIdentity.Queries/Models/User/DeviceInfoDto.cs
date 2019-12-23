using System;

namespace DeviousCreation.CqrsIdentity.Queries.Models.User
{
    public class DeviceInfo
    {
        public DeviceInfo(Guid id, string name, byte[] credentialId, byte[] publicKey)
        {
            this.Id = id;
            this.Name = name;
            this.CredentialId = credentialId;
            this.PublicKey = publicKey;
        }

        public Guid Id { get; }
        public string Name { get; }
        public byte[] CredentialId { get; }
        public byte[] PublicKey { get; }
    }
}
