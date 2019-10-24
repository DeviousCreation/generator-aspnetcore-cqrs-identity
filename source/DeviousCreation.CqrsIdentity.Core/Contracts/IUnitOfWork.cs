// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}