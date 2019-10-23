using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Models;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IRoleQueries
    {
        Task<StatusCheckModel> CheckForPresenceOfRoleByName(string name, CancellationToken cancellationToken);
        Task<StatusCheckModel> CheckForPresenceOfRoleByNameWithIdExclusion(string name, Guid idToExclude, CancellationToken cancellationToken);
        Task<StatusCheckModel> CheckForRoleUsageById(Guid id, CancellationToken cancellationToken);
    }
}