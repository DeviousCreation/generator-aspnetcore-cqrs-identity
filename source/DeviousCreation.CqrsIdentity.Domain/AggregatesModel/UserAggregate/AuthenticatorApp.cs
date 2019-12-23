using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public class AuthenticatorApp : Entity
    {
        public AuthenticatorApp(Guid id, string key, DateTime whenEnrolled)
        {
            this.Id = id;
            this.Key = key;
            this.WhenEnrolled = whenEnrolled;
        }
       public string Key { get; private set; }
       public DateTime WhenEnrolled { get; private set; }
       public DateTime? WhenRevoked { get; private set; }

       public void RevokeApp(DateTime whenRevoked)
       {
           this.WhenRevoked = whenRevoked;
       }
    }
}
