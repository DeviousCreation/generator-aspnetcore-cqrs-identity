using System;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Queries.Models;
using DeviousCreation.CqrsIdentity.Queries.Models.Role;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects.Role;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Queries
{
    public class RoleQueries : IRoleQueries
    {
        private readonly IDbConnectionProvider _dbConnectionProvider;

        public RoleQueries(IDbConnectionProvider dbConnectionProvider)
        {
            this._dbConnectionProvider = dbConnectionProvider;
        }

        public async Task<StatusCheckModel> CheckForPresenceOfRoleByName(string name,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("name", name, DbType.String);

            var command = new CommandDefinition(
                "select top 1 name from [AccessProtection].[Role] where name = @name",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<string>>(command);
            var dtos = res as PresenceCheckDto<string>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<StatusCheckModel> CheckForPresenceOfRoleByNameWithIdExclusion(string name, Guid idToExclude,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("name", name, DbType.String);
            parameters.Add("id", idToExclude, DbType.Guid);

            var command = new CommandDefinition(
                "select top 1 name from [AccessProtection].[Role] where name = @name and id <> @id",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<string>>(command);
            var dtos = res as PresenceCheckDto<string>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<StatusCheckModel> CheckForRoleUsageById(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Maybe<ListResult<SimpleResource>>> GetNestedSimpleResources(
            CancellationToken cancellationToken)
        {
            var command = new CommandDefinition(
                "SELECT Id, Name, ParentResourceId FROM [AccessProtection].[Resource]",
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<SimpleResourceDto>(command);
            var dtos = res as SimpleResourceDto[] ?? res.ToArray();
            if (dtos.Length == 0)
            {
                return Maybe<ListResult<SimpleResource>>.Nothing;
            }

            var items = dtos.Select(
                i => new SimpleResource(i.Id, i.Name, i.ParentResourceId)
            ).ToList();

            foreach (var i in items)
            {
                i.SetSimpleResources(items.Where(n => n.ParentId == i.Id).ToList());
            }

            return Maybe.From(new ListResult<SimpleResource>(items.Where(n => n.ParentId == Guid.Empty)));
        }

        public async Task<Maybe<ListResult<SimpleResource>>> GetNestedSimpleResourcesAvailableForUser(Guid userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Maybe<ListResult<SimpleRole>>> GetSimpleRoles(CancellationToken cancellationToken)
        {
            var command = new CommandDefinition(
                "SELECT Id, Name FROM [AccessProtection].[Role]",
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<SimpleRoleDto>(command);
            var dtos = res as SimpleRoleDto[] ?? res.ToArray();
            if (dtos.Length < 1)
            {
                return Maybe<ListResult<SimpleRole>>.Nothing;
            }

            return Maybe.From(new ListResult<SimpleRole>(dtos.Select(x => new SimpleRole(x.Id, x.Name))));
        }

        public async Task<Maybe<ListResult<SimpleResource>>> GetResourcesByRoleId(Guid roleId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Maybe<DetailedRole>> GetRoleDetailsForRoleByRoleId(Guid roleId, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("roleId", roleId, DbType.Guid);

            var command = new CommandDefinition(
                "SELECT r.Id, r.Name FROM [AccessProtection].[Role] r where r.id = @roleId;" +
                "SELECT ResourceId FROM[AccessProtection].[RoleResource] where RoleId = @roleId;",
                parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryMultipleAsync(command);
            var detailedUseResult = await res.ReadAsync<DetailedRoleDto>();
            var dtos = detailedUseResult as DetailedRoleDto[] ?? detailedUseResult.ToArray();
            if (dtos.Length != 1)
            {
                return Maybe<DetailedRole>.Nothing;
            }

            var entity = dtos.Single();

            var resourceResult = await res.ReadAsync<Guid>();

            return Maybe.From(
                new DetailedRole(entity.Id, entity.Name, resourceResult.ToList()));
        }

        public async Task<Maybe<ListResult<SimpleResource>>> GetSimpleResourcesAvailableForUser(Guid userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Maybe<ListResult<SimpleResource>>> GetSimpleResources(CancellationToken cancellationToken)
        {
            
            var command = new CommandDefinition(
                "SELECT Id, Name, ParentResourceId FROM [AccessProtection].[Resource]",
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<SimpleResourceDto>(command);
            var dtos = res as SimpleResourceDto[] ?? res.ToArray();
            if (dtos.Length == 0)
            {
                return Maybe<ListResult<SimpleResource>>.Nothing;
            }

            return Maybe.From(new ListResult<SimpleResource>(dtos.Select(x => new SimpleResource(x.Id, x.Name, null))));
        }
    }
}