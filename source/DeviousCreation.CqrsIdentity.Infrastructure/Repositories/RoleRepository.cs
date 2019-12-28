using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using MaybeMonad;
using Microsoft.EntityFrameworkCore;

namespace DeviousCreation.CqrsIdentity.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _dataContext;

        public RoleRepository(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IUnitOfWork UnitOfWork => this._dataContext;

        public IRole Add(IRole role)
        {
            var entity = role as Role;
            if (entity == null)
            {
                throw new ArgumentException(nameof(role));
            }

            return this._dataContext.Roles.Add(entity).Entity;
        }

        public async Task<Maybe<IRole>> Find(Guid id, CancellationToken cancellationToken)
        {
            var role = await this._dataContext.Roles.SingleOrDefaultAsync(x => x.Id == id, cancellationToken);
            await this.LoadCollections(role);
            return Maybe.From<IRole>(role);
        }

        private async Task LoadCollections(Role entity)
        {
            if (entity != null)
            {
                await this._dataContext.Entry(entity).ReloadAsync();
                await this._dataContext.Entry(entity).Collection(w => w.RoleResources).LoadAsync();
            }
        }

        public void Update(IRole role)
        {
            throw new NotImplementedException();
        }
    }
}
