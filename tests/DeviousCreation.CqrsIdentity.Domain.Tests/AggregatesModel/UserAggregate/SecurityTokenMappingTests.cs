using System;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Domain.Tests.AggregatesModel.UserAggregate
{
    public class SecurityTokenMappingTests
    {
        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var securityTokenMapping = (SecurityTokenMapping)Activator.CreateInstance(typeof(SecurityTokenMapping), true);
            Assert.NotNull(securityTokenMapping);
        }

        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var purpose = SecurityTokenPurpose.AccountConfirmation;
            var createdOn = DateTime.Now;
            var expiresOn = createdOn.AddDays(1);
            var securityTokenMapping = new SecurityTokenMapping(id, purpose, createdOn, expiresOn);

            Assert.Equal(id, securityTokenMapping.Id);
            Assert.Equal(purpose, securityTokenMapping.Purpose);
            Assert.Equal(createdOn, securityTokenMapping.WhenCreated);
            Assert.Equal(expiresOn, securityTokenMapping.WhenExpires);
            Assert.Null(securityTokenMapping.WhenUsed);
        }

        [Fact]
        public void MarkUsed_WhenValid_UsedDateIsSet()
        {
            var id = Guid.NewGuid();
            var purpose = SecurityTokenPurpose.AccountConfirmation;
            var createdOn = DateTime.Now;
            var expiresOn = createdOn.AddDays(1);
            var usedOn = createdOn.AddDays(0.5);
            var securityTokenMapping = new SecurityTokenMapping(id, purpose, createdOn, expiresOn);

            securityTokenMapping.MarkUsed(usedOn);

            Assert.Equal(usedOn, securityTokenMapping.WhenUsed);
        }
    }
}