﻿// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core.Domain;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate
{
    public sealed class Role : Entity, IRole
    {
        public Role(Guid id, string name)
        {
            this.Id = id;
            this.Name = name;
        }

        private Role()
        {
        }

        public string Name { get; private set; }

        public void FlagAsDeleted()
        {
            throw new NotImplementedException();
        }

        public void UpdateName(string name)
        {
            this.Name = name;
        }
    }
}