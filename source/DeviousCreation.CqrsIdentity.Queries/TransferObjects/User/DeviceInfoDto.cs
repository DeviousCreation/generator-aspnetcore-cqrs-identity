using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects.User
{
    public class DeviceInfoDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public byte[] CredentialId { get; set; }
        public byte[] PublicKey { get; set; }
    }
}
