// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public interface IUserRepository : IRepository<IUser>
    {
        Task<Maybe<IUser>> FindByEmailAddress(string emailAddress, CancellationToken cancellationToken);

        void Update(IUser user);

        Task<Maybe<IUser>> Find(Guid userId, CancellationToken cancellationToken);

        Task<Maybe<IUser>> FindByUserBySecurityToken(string token, DateTime expiryDate,
            CancellationToken cancellationToken);

        IUser Add(IUser user);
    }
}