using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate
{
    public class InitiatelAuthenticatorAppEnrollmentCommandResult
    {
        public string SharedKey { get; }

        
        public InitiatelAuthenticatorAppEnrollmentCommandResult(string sharedKey)
        {
            this.SharedKey = sharedKey;
        }
    }
}
