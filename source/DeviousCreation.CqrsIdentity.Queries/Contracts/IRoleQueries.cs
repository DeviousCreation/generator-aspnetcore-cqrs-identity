// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Models;
using DeviousCreation.CqrsIdentity.Queries.Models.Role;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IRoleQueries
    {
        Task<StatusCheckModel> CheckForPresenceOfRoleByName(string name, CancellationToken cancellationToken);

        Task<StatusCheckModel> CheckForPresenceOfRoleByNameWithIdExclusion(string name, Guid idToExclude, CancellationToken cancellationToken);

        Task<StatusCheckModel> CheckForRoleUsageById(Guid id, CancellationToken cancellationToken);

        Task<Maybe<ListResult<SimpleResource>>> GetNestedSimpleResources(CancellationToken cancellationToken);
        Task<Maybe<ListResult<SimpleResource>>> GetNestedSimpleResourcesAvailableForUser(Guid userId, CancellationToken cancellationToken);
        Task<Maybe<ListResult<SimpleRole>>> GetSimpleRoles(CancellationToken cancellationToken);
        Task<Maybe<ListResult<SimpleResource>>> GetResourcesByRoleId(Guid roleId, CancellationToken cancellationToken);
        Task<Maybe<DetailedRole>> GetRoleDetailsForRoleByRoleId(Guid id, CancellationToken cancellationToken);
        Task<Maybe<ListResult<SimpleResource>>> GetSimpleResourcesAvailableForUser(Guid userId, CancellationToken cancellationToken);
        Task<Maybe<ListResult<SimpleResource>>> GetSimpleResources(CancellationToken cancellationToken);
    }
}