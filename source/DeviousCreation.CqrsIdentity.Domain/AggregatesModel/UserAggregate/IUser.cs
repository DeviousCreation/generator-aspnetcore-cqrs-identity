// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core.Contracts;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public interface IUser : IAggregateRoot, IEntity
    {
        string EmailAddress { get; }

        string Username { get; }

        string PasswordHash { get; }

        DateTime? WhenVerified { get; }

        bool IsVerified { get; }

        DateTime? WhenPasswordChanged { get; }

        bool IsLockable { get; }

        int SignInAttempts { get; }

        DateTime? WhenLocked { get; }

        bool IsLocked { get; }

        DateTime? WhenSignedIn { get; }

        Profile Profile { get; }

        IReadOnlyList<SecurityTokenMapping> SecurityTokenMappings { get; }

        IReadOnlyList<PasswordHistory> PasswordHistories { get; }

        IReadOnlyList<SignInHistory> SignInHistories { get; }

        IReadOnlyList<UserRole> UserRoles { get; }

        DateTime WhenCreated { get; }

        void AddFailedLoginAttempt(DateTime whenAttempted);

        void ChangePasswordAndAddToHistory(string newPassword, DateTime whenChanged);

        bool CheckAndApplyAccountLock(int maxLoginAttempts, DateTime whenLocked);

        SecurityTokenMapping GenerateNewAccountConfirmationToken(DateTime whenCreated, DateTime whenExpires);

        SecurityTokenMapping GenerateNewPasswordResetToken(DateTime whenCreated, DateTime whenExpires);

        void CompleteTokenLifecycle(string token, DateTime usedOn);

        void UpdateValidLoginProperties(DateTime whenHappened);

        bool IsPasswordInHistory(int historicalLimit, Func<string, bool> hasher);

        void VerifyAccountAndSetPassword(string password, DateTime whenConfirmed);

        void RandomizePassword(string newPassword, DateTime whenChanged);

        bool CheckAndApplyAccountLock(DateTime whenLocked);

        void UnlockAccount(DateTime whenHappened, DateTime whenPasswordTokenExpires);

        void VerifyAccount(DateTime whenHappened);
    }
}