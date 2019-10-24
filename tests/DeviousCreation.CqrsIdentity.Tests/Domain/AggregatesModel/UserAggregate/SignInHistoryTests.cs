// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Tests.Domain.AggregatesModel.UserAggregate
{
    public class SignInHistoryTests
    {
        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var signInHistory = (SignInHistory)Activator.CreateInstance(typeof(SignInHistory), true);
            Assert.NotNull(signInHistory);
        }

        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var whenHappened = DateTime.Now;
            var signInHistoryType = SignInHistoryType.Failure;
            var signInHistory = new SignInHistory(id, whenHappened, signInHistoryType);

            Assert.Equal(id, signInHistory.Id);
            Assert.Equal(whenHappened, signInHistory.WhenHappened);
            Assert.Equal(signInHistoryType, signInHistory.SignInHistoryType);
        }
    }
}