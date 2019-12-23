using System;
using System.Collections.Generic;
using System.Text;
using Fido2NetLib;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate
{
    public class EnrollDeviceCommandResult
    {
        public Fido2.CredentialMakeResult CredentialMakeResult { get; }

        public EnrollDeviceCommandResult(Fido2.CredentialMakeResult credentialMakeResult)
        {
            this.CredentialMakeResult = credentialMakeResult;
            
        }
    }
}
