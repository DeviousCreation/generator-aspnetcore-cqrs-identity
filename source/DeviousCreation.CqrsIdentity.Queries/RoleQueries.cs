using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Queries.Models;
using DeviousCreation.CqrsIdentity.Queries.Models.Role;
using DeviousCreation.CqrsIdentity.Queries.Models.User;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects.Role;
using DeviousCreation.CqrsIdentity.Queries.TransferObjects.User;
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

        public async Task<StatusCheckModel> CheckForPresenceOfRoleByName(string name, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();
            parameters.Add("name", name, DbType.String);

            var command = new CommandDefinition(
                "select top 1 name from [AccessProtection].[Role] where name = @name",
                parameters: parameters,
                cancellationToken: cancellationToken);

            using var connection = this._dbConnectionProvider.Connection;
            connection.Open();

            var res = await connection.QueryAsync<PresenceCheckDto<string>>(command);
            var dtos = res as PresenceCheckDto<string>[] ?? res.ToArray();
            return new StatusCheckModel(dtos.Length > 0);
        }

        public async Task<StatusCheckModel> CheckForPresenceOfRoleByNameWithIdExclusion(string name, Guid idToExclude, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<StatusCheckModel> CheckForRoleUsageById(Guid id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Maybe<ListResult<SimpleResource>>> GetNestedSimpleResources(CancellationToken cancellationToken)
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

    }
}
