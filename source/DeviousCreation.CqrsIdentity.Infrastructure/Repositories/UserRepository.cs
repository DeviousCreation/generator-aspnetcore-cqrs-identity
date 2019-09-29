using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using MaybeMonad;
using Microsoft.EntityFrameworkCore;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        public IUnitOfWork UnitOfWork => this._dataContext;
        public async Task<Maybe<IUser>> FindByUsername(string username, CancellationToken cancellationToken)
        {
            var user = await this._dataContext.Users.SingleOrDefaultAsync(x => x.Username == username, cancellationToken);
            await this.LoadCollections(user);
            return Maybe.From<IUser>(user);
        }

        public async Task<Maybe<IUser>> FindByEmailAddress(string emailAddress, CancellationToken cancellationToken)
        {
            var user = await this._dataContext.Users.SingleOrDefaultAsync(x => x.EmailAddress == emailAddress, cancellationToken);
            await this.LoadCollections(user);
            return Maybe.From<IUser>(user);
        }

        public void Update(IUser user)
        {
            this._dataContext.Entry(user).State = EntityState.Modified;
        }

        public async Task<Maybe<IUser>> Find(Guid userId, CancellationToken cancellationToken)
        {
            var user = await this._dataContext.Users.SingleOrDefaultAsync(x => x.Id == userId, cancellationToken);
            await this.LoadCollections(user);
            return Maybe.From<IUser>(user);
        }

        public async Task<Maybe<IUser>> FindByUserBySecurityToken(string token, DateTime expiryDate, CancellationToken cancellationToken)
        {
            var user = await this._dataContext.Users.SingleOrDefaultAsync(x => x.SecurityTokenMappings.Any(y=>y.Token == token && y.WhenExpires > expiryDate), cancellationToken);
            await this.LoadCollections(user);
            return Maybe.From<IUser>(user);
        }

        public IUser Add(IUser user)
        {
            var entity = user as User;
            if (user == null)
            {
                throw new ArgumentException(nameof(user));
            }

            return this._dataContext.Users.Add(entity).Entity;
        }


        private async Task LoadCollections(IUser entity)
        {
            if (entity != null)
            {
                await this._dataContext.Entry(entity).ReloadAsync();
                await this._dataContext.Entry(entity).Collection(w => w.PasswordHistories).LoadAsync();
                await this._dataContext.Entry(entity).Collection(w => w.SecurityTokenMappings).LoadAsync();
                await this._dataContext.Entry(entity).Collection(w => w.PasswordHistories).LoadAsync();
                await this._dataContext.Entry(entity).Collection(w => w.UserRoles).LoadAsync();
                await this._dataContext.Entry(entity).Collection(w => w.SignInHistories).LoadAsync();
            }
        }
    }
}
