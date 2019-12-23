using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects.User
{
    public class MfaMethodStatusDto
    {
        public Guid UserId { get; set; }
        public string MobileNumber { get; set; }
        public int AuthAppCount { get; set; }
        public int AuthDeviceCount { get; set; }
    }
}
