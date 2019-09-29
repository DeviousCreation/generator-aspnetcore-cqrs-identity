using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Domain.Tests.AggregatesModel.UserAggregate
{
    public class PasswordHistoryTests
    {
        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var passwordHistory = (PasswordHistory)Activator.CreateInstance(typeof(PasswordHistory), true);
            Assert.NotNull(passwordHistory);
        }

        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var passwordHash = new string('*', 10);
            var dateUsed = DateTime.Now;
            var userRole = new PasswordHistory(id, passwordHash, dateUsed);

            Assert.Equal(id, userRole.Id);
            Assert.Equal(passwordHash, userRole.PasswordHash);
            Assert.Equal(dateUsed, userRole.WhenUsed);
        }
    }
}
