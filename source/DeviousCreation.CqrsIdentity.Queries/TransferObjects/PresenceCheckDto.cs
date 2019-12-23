using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Queries.TransferObjects
{
    internal sealed class PresenceCheckDto<TPresence>
    {
        public TPresence PresenceIdentifier { get; set; }
    }
}
