using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Models;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IUserQueries
    {
        Task<StatusCheckModel> CheckForPresenceOfUserByUsername(string username, CancellationToken cancellationToken);
        Task<StatusCheckModel> CheckForPresenceOfUserByEmailAddress(string username,
            CancellationToken cancellationToken);
    }

    
}
