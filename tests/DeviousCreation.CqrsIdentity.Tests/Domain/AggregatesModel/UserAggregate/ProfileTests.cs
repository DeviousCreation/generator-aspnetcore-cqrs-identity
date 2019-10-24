// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Tests.Domain.AggregatesModel.UserAggregate
{
    public class ProfileTests
    {
        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var profile = (Profile)Activator.CreateInstance(typeof(Profile), true);
            Assert.NotNull(profile);
        }

        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var firstName = new string('*', 10);
            var lastName = new string('*', 20);
            var profile = new Profile(id, firstName, lastName);

            Assert.Equal(id, profile.Id);
            Assert.Equal(firstName, profile.FirstName);
            Assert.Equal(lastName, profile.LastName);
        }

        [Fact]
        public void UpdateProfile_WhenValid_PropertiesAreUpdated()
        {
            var id = Guid.NewGuid();
            var firstName = new string('*', 10);
            var lastName = new string('*', 20);
            var profile = new Profile(id, firstName, lastName);

            firstName = new string('!', 10);
            lastName = new string('!', 20);
            profile.UpdateProfile(firstName, lastName);

            Assert.Equal(id, profile.Id);
            Assert.Equal(firstName, profile.FirstName);
            Assert.Equal(lastName, profile.LastName);
        }
    }
}