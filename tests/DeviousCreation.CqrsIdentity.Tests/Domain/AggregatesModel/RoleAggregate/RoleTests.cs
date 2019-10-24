// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Tests.Domain.AggregatesModel.RoleAggregate
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