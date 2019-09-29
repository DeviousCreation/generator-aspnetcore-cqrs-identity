using System;
using System.Collections.Generic;
using System.Text;

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IPasswordGenerator
    {
        string Generate();
    }
}
