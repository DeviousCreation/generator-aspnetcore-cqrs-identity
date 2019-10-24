// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Tests.Domain.AggregatesModel.UserAggregate
{
    public class PasswordHistoryTests
    {
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

        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var passwordHistory = (PasswordHistory)Activator.CreateInstance(typeof(PasswordHistory), true);
            Assert.NotNull(passwordHistory);
        }
    }
}