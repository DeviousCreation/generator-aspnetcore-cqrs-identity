// TOKEN_COPYRIGHT_TEXT

using System;
using System.Linq;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using Xunit;

namespace DeviousCreation.CqrsIdentity.Tests.Domain.AggregatesModel.UserAggregate
{
    public class UserTests
    {
        [Fact]
        public void Constructor_WhenCalled_PropertiesAreSet()
        {
            var id = Guid.NewGuid();
            var emailAddress = new string('*', 5);
            var username = new string('*', 10);
            var password = new string('*', 15);
            var isLockable = false;
            var whenCreated = DateTime.Now;
            var user = new User(id, emailAddress, username, password, isLockable, whenCreated);

            Assert.Equal(id, user.Id);
            Assert.Equal(emailAddress, user.EmailAddress);
            Assert.Equal(username, user.Username);
            Assert.Equal(password, user.PasswordHash);
            Assert.Equal(isLockable, user.IsLockable);
            Assert.Equal(whenCreated, user.WhenCreated);
            var lastPassword = user.PasswordHistories.Last();
            Assert.Equal(password, lastPassword.PasswordHash);
            Assert.Equal(whenCreated, lastPassword.WhenUsed);

            foreach (var prop in user.GetType().GetProperties().Where(x => x.PropertyType.Name == "IReadOnlyList`1"))
            {
                var val = prop.GetValue(user, null);
                Assert.False(val == null, $"{prop.Name} is null");
            }
        }

        [Fact]
        public void Constructor_WhenPrivateIsCalled_ObjectIsCreated()
        {
            var user = (User)Activator.CreateInstance(typeof(User), true);
            Assert.NotNull(user);

            foreach (var prop in user.GetType().GetProperties().Where(x => x.PropertyType.Name == "IReadOnlyList`1"))
            {
                var val = prop.GetValue(user, null);
                Assert.False(val == null, $"{prop.Name} is null");
            }
        }

        [Fact]
        public void AddFailedLoginAttempt_SignInAttemptsIncreaseAndAttemptIsLogged()
        {
            var whenAttempted = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.AddFailedLoginAttempt(whenAttempted);
            Assert.Equal(1, user.SignInAttempts);
            var lastAttempt = user.SignInHistories.Last();
            Assert.Equal(SignInHistoryType.Failure, lastAttempt.SignInHistoryType);
            Assert.Equal(whenAttempted, lastAttempt.WhenHappened);
        }

        [Fact]
        public void ChangePasswordAndAddToHistory_PasswordIsChangedAndAddedToHistory()
        {
            var whenChanged = DateTime.UtcNow;
            var newPassword = new string('*', 5);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.ChangePasswordAndAddToHistory(newPassword, whenChanged);
            Assert.Equal(whenChanged, user.WhenPasswordChanged);
            Assert.Equal(newPassword, user.PasswordHash);
            var last = user.PasswordHistories.Last();
            Assert.Equal(whenChanged, last.WhenUsed);
            Assert.Equal(newPassword, last.PasswordHash);
        }

        [Fact]
        public void CheckAndApplyAccountLock_GivenUserIsNotLockableAndTooManySignInAttempts_AccountIsNotLocked()
        {
            var whenLocked = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, false, DateTime.UtcNow);
            user.CheckAndApplyAccountLock(-1, whenLocked);
            Assert.False(user.IsLocked);
            Assert.Null(user.WhenLocked);
            Assert.Null(user.DomainEvents);
        }

        [Fact]
        public void CheckAndApplyAccountLock_GivenUserIsLockableAndTooManySignInAttempts_AccountIsLocked()
        {
            var whenLocked = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.CheckAndApplyAccountLock(-1, whenLocked);
            Assert.True(user.IsLocked);
            Assert.Equal(whenLocked, user.WhenLocked);
            Assert.NotEmpty(user.DomainEvents);
        }

        [Fact]
        public void CheckAndApplyAccountLock_GivenUserIsLockableAndTooFewSignInAttempts_AccountIsNotLocked()
        {
            var whenLocked = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.CheckAndApplyAccountLock(2, whenLocked);
            Assert.False(user.IsLocked);
            Assert.Null(user.WhenLocked);
            Assert.Null(user.DomainEvents);
        }

        [Fact]
        public void CheckAndApplyAccountLock_GivenUserIsNotLockable_AccountIsNotLocked()
        {
            var whenLocked = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, false, DateTime.UtcNow);
            user.CheckAndApplyAccountLock(whenLocked);
            Assert.False(user.IsLocked);
            Assert.Null(user.WhenLocked);
            Assert.Null(user.DomainEvents);
        }

        [Fact]
        public void CheckAndApplyAccountLock_GivenUserIsLockable_AccountIsLocked()
        {
            var whenLocked = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.CheckAndApplyAccountLock(whenLocked);
            Assert.True(user.IsLocked);
            Assert.Equal(whenLocked, user.WhenLocked);
        }

        [Fact]
        public void GenerateNewAccountConfirmationToken_GivenTokenDoesNotExist_NewTokenIsCreated()
        {
            var whenCreated = DateTime.UtcNow;
            var whenExpired = DateTime.UtcNow.AddDays(1);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            var token = user.GenerateNewAccountConfirmationToken(whenCreated, whenExpired);
            Assert.Contains(token, user.SecurityTokenMappings);
            Assert.Equal(SecurityTokenPurpose.AccountConfirmation, token.Purpose);
            Assert.NotNull(user.DomainEvents);
        }

        [Fact]
        public void GenerateNewAccountConfirmationToken_GivenTokenDoesExist_ExistingTokenIsReturned()
        {
            var whenCreated = DateTime.UtcNow;
            var whenExpired = DateTime.UtcNow.AddDays(1);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            var token1 = user.GenerateNewAccountConfirmationToken(whenCreated, whenExpired);
            var token2 = user.GenerateNewAccountConfirmationToken(whenCreated, whenExpired);
            Assert.Contains(token1, user.SecurityTokenMappings);
            Assert.Equal(SecurityTokenPurpose.AccountConfirmation, token1.Purpose);
            Assert.Equal(token1, token2);
            Assert.NotNull(user.DomainEvents);
        }

        [Fact]
        public void GenerateNewPasswordResetToken_GivenTokenDoesNotExist_NewTokenIsCreated()
        {
            var whenCreated = DateTime.UtcNow;
            var whenExpired = DateTime.UtcNow.AddDays(1);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            var token = user.GenerateNewPasswordResetToken(whenCreated, whenExpired);
            Assert.Contains(token, user.SecurityTokenMappings);
            Assert.Equal(SecurityTokenPurpose.PasswordReset, token.Purpose);
            Assert.NotNull(user.DomainEvents);
        }

        [Fact]
        public void GenerateNewPasswordResetToken_GivenTokenDoesExist_ExistingTokenIsReturned()
        {
            var whenCreated = DateTime.UtcNow;
            var whenExpired = DateTime.UtcNow.AddDays(1);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            var token1 = user.GenerateNewPasswordResetToken(whenCreated, whenExpired);
            var token2 = user.GenerateNewPasswordResetToken(whenCreated, whenExpired);
            Assert.Contains(token1, user.SecurityTokenMappings);
            Assert.Equal(SecurityTokenPurpose.PasswordReset, token1.Purpose);
            Assert.Equal(token1, token2);
            Assert.NotNull(user.DomainEvents);
        }

        [Fact]
        public void CompleteTokenLifecycle_GiveTokenExists_TokenIsMarkAsUsed()
        {
            var whenCreated = DateTime.UtcNow;
            var whenExpired = DateTime.UtcNow.AddDays(1);
            var whenUsed = DateTime.UtcNow.AddDays(0.5);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            var token = user.GenerateNewPasswordResetToken(whenCreated, whenExpired);
            user.CompleteTokenLifecycle(token.Token, whenUsed);
            Assert.Equal(whenUsed, token.WhenUsed);
        }

        [Fact]
        public void UpdateValidLoginProperties_SignInAttemptsResetAndAttemptIsLogged()
        {
            var whenHappened = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.AddFailedLoginAttempt(whenHappened);
            user.UpdateValidLoginProperties(whenHappened);
            Assert.Equal(0, user.SignInAttempts);
            Assert.Equal(whenHappened, user.WhenSignedIn);
            var lastAttempt = user.SignInHistories.Last();
            Assert.Equal(SignInHistoryType.Success, lastAttempt.SignInHistoryType);
            Assert.Equal(whenHappened, lastAttempt.WhenHappened);
        }

        [Fact]
        public void IsPasswordInHistory_WhenPasswordIsInHistory_ReturnTrue()
        {
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, new string('*', 2), true, DateTime.UtcNow);
            var result = user.IsPasswordInHistory(10, s => true);
            Assert.True(result);
        }

        [Fact]
        public void IsPasswordInHistory_WhenPasswordIsNotInHistory_ReturnFalse()
        {
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, new string('*', 2), true, DateTime.UtcNow);
            var result = user.IsPasswordInHistory(10, s => false);
            Assert.False(result);
        }

        [Fact]
        public void VerifyAccountAndSetPassword_AccountIsVerifiedAndPasswordUpdated()
        {
            var password = new string('*', 5);
            var whenVerified = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, new string('*', 2), true, DateTime.UtcNow);
            user.VerifyAccountAndSetPassword(password, whenVerified);
            Assert.True(user.IsVerified);
            Assert.Equal(password, user.PasswordHash);
            Assert.Equal(whenVerified, user.WhenVerified);
        }

        [Fact]
        public void RandomizePassword_PasswordIsChangedAndNotAddedToHistory()
        {
            var password = new string('*', 5);
            var whenChanged = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.RandomizePassword(password, whenChanged);
            Assert.Equal(password, user.PasswordHash);
            Assert.Equal(whenChanged, user.WhenPasswordChanged);
            Assert.DoesNotContain(user.PasswordHistories, history => history.PasswordHash == password && history.WhenUsed == whenChanged);
        }

        [Fact]
        public void UnlockAccount_AccountIsUnlockedAndPasswordResetIsGenerated()
        {
            var whenCreated = DateTime.UtcNow;
            var whenExpired = DateTime.UtcNow.AddDays(1);
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.CheckAndApplyAccountLock(DateTime.Now);
            user.UnlockAccount(whenCreated, whenExpired);
            Assert.Null(user.WhenLocked);
            Assert.False(user.IsLocked);
            Assert.NotNull(user.DomainEvents);
        }

        [Fact]
        public void VerifyAccount_AccountFlaggedAsVerified()
        {
            var whenVerified = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), string.Empty, string.Empty, string.Empty, true, DateTime.UtcNow);
            user.VerifyAccount(whenVerified);
            Assert.Equal(whenVerified, user.WhenVerified);
        }
    }
}