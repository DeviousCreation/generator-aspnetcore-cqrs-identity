// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core.Contracts;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate
{
    public interface IRole : IAggregateRoot, IEntity
    {
        string Name { get; }

        IReadOnlyList<RoleResource> RoleResources { get; }

        void FlagAsDeleted();

        void UpdateName(string name);

        void SetRoles(IReadOnlyList<Guid> roles);
    }
}