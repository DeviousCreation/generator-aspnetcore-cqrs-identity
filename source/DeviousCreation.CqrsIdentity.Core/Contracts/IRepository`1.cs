// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface IRepository<T>
        where T : IAggregateRoot
    {
        IUnitOfWork UnitOfWork { get; }
    }
}