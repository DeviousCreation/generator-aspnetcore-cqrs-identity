using System;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Domain.Tests.AggregatesModel.UserAggregate
{
    public class UserRoleTests
    {
        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var userRole = new UserRole(id);

            Assert.Equal(id, userRole.Id);
        }

        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var userRole = (UserRole) Activator.CreateInstance(typeof(UserRole), true);
            Assert.NotNull(userRole);
        }
    }
}