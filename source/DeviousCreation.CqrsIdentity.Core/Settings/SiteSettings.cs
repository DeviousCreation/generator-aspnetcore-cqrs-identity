using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Core.Settings
{
    public class SiteSettings
    {
        public string Name { get; set; }
        public string Url { get; set; }

        public bool MfaEnforced { get; set; }
    }
}
