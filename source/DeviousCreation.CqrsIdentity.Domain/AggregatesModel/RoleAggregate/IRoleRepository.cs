using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate
{
    public interface IRoleRepository : IRepository<IRole>
    {
        IRole Add(IRole role);
        Task<Maybe<IRole>> Find(Guid id, CancellationToken cancellationToken);
        void Update(IRole role);
    }
}