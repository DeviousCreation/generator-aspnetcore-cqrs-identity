using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Domain.Tests.AggregatesModel.RoleAggregate
{
    public class RoleTests
    {
        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var role = (Role)Activator.CreateInstance(typeof(Role), true);
            Assert.NotNull(role);
        }

        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var name = new string('*', 10);
            var role = new Role(id, name);

            Assert.Equal(id, role.Id);
            Assert.Equal(name, role.Name);
        }
    }
}