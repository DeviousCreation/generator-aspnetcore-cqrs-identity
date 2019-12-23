// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Models;
using DeviousCreation.CqrsIdentity.Queries.Models.User;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IUserQueries
    {
        Task<StatusCheckModel> CheckForPresenceOfUserByUsername(string username, CancellationToken cancellationToken);

        Task<StatusCheckModel> CheckForPresenceOfUserByEmailAddress(
            string username, CancellationToken cancellationToken);

        Task<StatusCheckModel> CheckForPresenceOfAnyUser(CancellationToken cancellationToken);

        Task<StatusCheckModel> CheckCurrentUserHasAuthApp(CancellationToken cancellationToken);
        Task<Maybe<SystemProfile>> GetSystemProfileByUserId(Guid userId, CancellationToken cancellationToken);
        Task<Maybe<ListResult<DeviceInfo>>> GetDeviceInfoForCurrentUser(CancellationToken cancellationToken);
        Task<StatusCheckModel> CheckForPresenceOfDeviceForCurrentUserByName(string name, CancellationToken cancellationToken);
        Task<MfaMethodStatus> GetMfaMethodStatusForCurrentUser(CancellationToken cancellationToken);
        Task<Maybe<SystemProfile>> GetSystemProfileForCurrentUser(CancellationToken cancellationToken);
    }
}