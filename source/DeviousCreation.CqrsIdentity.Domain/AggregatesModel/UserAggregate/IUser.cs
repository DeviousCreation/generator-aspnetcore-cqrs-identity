// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core.Contracts;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public interface IUser : IAggregateRoot, IEntity
    {
        string EmailAddress { get; }
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

        IReadOnlyCollection<SecurityTokenMapping> SecurityTokenMappings { get; }

        IReadOnlyCollection<PasswordHistory> PasswordHistories { get; }

        IReadOnlyCollection<SignInHistory> SignInHistories { get; }

        IReadOnlyCollection<UserRole> UserRoles { get; }
        IReadOnlyCollection<AuthenticatorApp> AuthenticatorApps { get; }
        IReadOnlyCollection<AuthenticatorDevice> AuthenticatorDevices { get; }

        DateTime WhenCreated { get; }

        Guid SecurityStamp { get; }

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
        void UpdateProfile(string firstName, string lastName, string emailAddress);
        AuthenticatorApp EnrollAuthenticatorApp(Guid id, string key, DateTime whenEnrolled);
        void RevokeAuthenticatorApp(DateTime whenRevoked);
        AuthenticatorDevice EnrollAuthenticatorDevice(Guid id, DateTime whenEnrolled, byte[] publicKey, byte[] credentialId, Guid aaguid, int counter, string name, string credType);

        void SetRoles(IReadOnlyList<Guid> roles);
        void SetAdminStatus(bool isAdmin);
        void SetLockableStatus(bool isLockable);
    }
}