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
        Task<StatusCheckModel> CheckForPresenceOfUserByEmailAddress(
            string username, CancellationToken cancellationToken = default);

        Task<StatusCheckModel> CheckForPresenceOfAnyUser(CancellationToken cancellationToken = default);

        Task<StatusCheckModel> CheckCurrentUserHasAuthApp(CancellationToken cancellationToken = default);
        Task<Maybe<SystemProfile>> GetSystemProfileByUserId(Guid userId, CancellationToken cancellationToken = default);
        Task<Maybe<ListResult<DeviceInfo>>> GetDeviceInfoForCurrentUser(CancellationToken cancellationToken = default);

        Task<StatusCheckModel> CheckForPresenceOfDeviceForCurrentUserByName(
            string name, CancellationToken cancellationToken = default);

        Task<MfaMethodStatus> GetMfaMethodStatusForCurrentUser(CancellationToken cancellationToken = default);
        Task<Maybe<SystemProfile>> GetSystemProfileForCurrentUser(CancellationToken cancellationToken = default);

        Task<Maybe<DetailedUser>> GetUserDetailsForEditUserId(
            Guid userId, CancellationToken cancellationToken = default);
    }
}