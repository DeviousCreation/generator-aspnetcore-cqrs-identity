using DeviousCreation.CqrsIdentity.Core.Contracts;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate
{
    public interface IRole : IAggregateRoot, IEntity
    {
        string Name { get; }

        void FlagAsDeleted();
        void UpdateName(string name);
    }
}