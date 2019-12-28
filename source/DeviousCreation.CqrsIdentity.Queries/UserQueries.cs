using System;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Queries.Models;
using DeviousCreation.CqrsIdentity.Queries.Models.User;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects.User;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Queries
{
    public class UserQueries : IUserQueries
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDbConnectionProvider _dbConnectionProvider;

        public UserQueries(IDbConnectionProvider dbConnectionProvider, ICurrentUserService currentUserService)
        {
            this._dbConnectionProvider = dbConnectionProvider;
            this._currentUserService = currentUserService;
        }

        public async Task<StatusCheckModel> CheckForPresenceOfUserByUsername(string username,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("username", username, DbType.String);

            var command = new CommandDefinition(
                "select top 1 username from [identity].[user] where username = @username",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<string>>(command);
            var dtos = res as PresenceCheckDto<string>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<StatusCheckModel> CheckForPresenceOfUserByEmailAddress(string emailAddress,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("emailAddress", emailAddress, DbType.String);

            var command = new CommandDefinition(
                "select top 1 emailAddress from [identity].[user] where emailAddress = @emailAddress",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<string>>(command);
            var dtos = res as PresenceCheckDto<string>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<StatusCheckModel> CheckForPresenceOfAnyUser(CancellationToken cancellationToken)
        {
            var command = new CommandDefinition(
                "select top 1 id from [identity].[user]",
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<Guid>>(command);
            var dtos = res as PresenceCheckDto<Guid>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<StatusCheckModel> CheckCurrentUserHasAuthApp(CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return new StatusCheckModel(false);
            }

            var parameters = new DynamicParameters();
            parameters.Add("userId", currentUserMaybe.Value.UserId, DbType.Guid);

            var command = new CommandDefinition(
                "SELECT top 1 id FROM [Identity].AuthenticatorApp WHERE UserId = @userId AND WhenRevoked is NULL",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<Guid>>(command);
            var dtos = res as PresenceCheckDto<Guid>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<Maybe<SystemProfile>> GetSystemProfileByUserId(Guid userId,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("userId", userId, DbType.Guid);

            var command = new CommandDefinition(
                "SELECT u.Username, u.EmailAddress, p.FirstName, p.LastName, u.IsAdmin FROM [Identity].[User] u left join [Identity].[Profile] p on u.Id = p.UserId WHERE u.Id = @userId;" +
                "SELECT r.NormalizedName FROM[Identity].[UserRole] uR JOIN[AccessProtection].[RoleResource] rR ON rR.RoleId = uR.RoleId JOIN[AccessProtection].[Resource] r ON r.Id = rR.ResourceId WHERE uR.UserId = @userId;",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryMultipleAsync(command);
            var profileResult = await res.ReadAsync<SystemProfileDto>();
            var dtos = profileResult as SystemProfileDto[] ?? profileResult.ToArray();
            if (dtos.Length != 1)
            {
                return Maybe<SystemProfile>.Nothing;
            }

            var entity = dtos.Single();

            var resourceResult = await res.ReadAsync<string>();

            return Maybe.From(
                new SystemProfile(entity.EmailAddress, entity.FirstName, entity.LastName, entity.Username,
                    entity.IsAdmin, resourceResult.ToList()));
        }

        public async Task<Maybe<ListResult<DeviceInfo>>> GetDeviceInfoForCurrentUser(
            CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return Maybe<ListResult<DeviceInfo>>.Nothing;
            }

            var parameters = new DynamicParameters();
            parameters.Add("userId", currentUserMaybe.Value.UserId, DbType.Guid);

            var command = new CommandDefinition(
                "SELECT Id, Name, CredentialId, PublicKey FROM [Identity].[AuthenticatorDevice] WHERE UserId = @userId and WhenRevoked is null",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<DeviceInfoDto>(command);
            var dtos = res as DeviceInfoDto[] ?? res.ToArray();
            if (dtos.Length < 1)
            {
                return Maybe<ListResult<DeviceInfo>>.Nothing;
            }

            return Maybe.From(new ListResult<DeviceInfo>(dtos.Select(x =>
                new DeviceInfo(x.Id, x.Name, x.CredentialId, x.PublicKey))));
        }

        public async Task<StatusCheckModel> CheckForPresenceOfDeviceForCurrentUserByName(string name,
            CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return new StatusCheckModel(false);
            }

            var parameters = new DynamicParameters();
            parameters.Add("userId", currentUserMaybe.Value.UserId, DbType.Guid);
            parameters.Add("name", name, DbType.String);

            var command = new CommandDefinition(
                "SELECT top 1 id FROM [Identity].AuthenticatorDevice WHERE UserId = @userId AND Name = @name",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<Guid>>(command);
            var dtos = res as PresenceCheckDto<Guid>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<MfaMethodStatus> GetMfaMethodStatusForCurrentUser(CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return new MfaMethodStatus();
            }

            var parameters = new DynamicParameters();
            parameters.Add("userId", currentUserMaybe.Value.UserId, DbType.Guid);

            var command = new CommandDefinition(
                @"SELECT
        u.Id as UserId
    ,   u.MobileNumber
    ,   COUNT(aA.Id) as AuthAppCount
    ,   COUNT(aD.Id) as AuthDeviceCount
FROM [Identity].[User] u
LEFT JOIN [Identity].[AuthenticatorApp] aA
    ON u.Id = aA.UserId AND aa.WhenRevoked is null
LEFT JOIN [Identity].[AuthenticatorDevice] aD
    ON u.Id = aD.UserId AND aD.WhenRevoked is null
WHERE u.Id = @userId
GROUP BY 
        u.Id
    ,   u.MobileNumber
 ",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<MfaMethodStatusDto>(command);
            var dtos = res as MfaMethodStatusDto[] ?? res.ToArray();
            if (dtos.Length != 1)
            {
                return new MfaMethodStatus();
            }

            var dto = dtos.First();
            return new MfaMethodStatus(
                !string.IsNullOrWhiteSpace(dto.MobileNumber),
                dto.AuthAppCount > 0,
                dto.AuthDeviceCount > 0);
        }

        public async Task<Maybe<SystemProfile>> GetSystemProfileForCurrentUser(CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return Maybe<SystemProfile>.Nothing;
            }

            return await this.GetSystemProfileByUserId(currentUserMaybe.Value.UserId, cancellationToken);
        }
    }
}