using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Domain;
using DeviousCreation.CqrsIdentity.Domain.Events;

namespace DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate
{
    public sealed class User : Entity, IUser
    {
        private readonly List<SecurityTokenMapping> _securityTokenMappings;
        private readonly List<PasswordHistory> _passwordHistories;
        private readonly List<SignInHistory> _signInHistories;
        private readonly List<UserRole> _userRoles;

        private User()
        {
            this._securityTokenMappings = new List<SecurityTokenMapping>();
            this._passwordHistories = new List<PasswordHistory>();
            this._signInHistories = new List<SignInHistory>();
            this._userRoles = new List<UserRole>();
        }

        public User(Guid id, string emailAddress, string username, string passwordHash, bool isLockable, DateTime whenCreated)
            : this()
        {
            this.Id = id;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.PasswordHash = passwordHash;
            this.IsLockable = isLockable;
            this.WhenCreated = whenCreated;
        }

        public string EmailAddress { get; private set; }
        
        public string Username { get; private set; }
        
        public string PasswordHash { get; private set; }
        
        public DateTime? WhenVerified { get; private set; }
        
        public bool IsVerified => this.WhenVerified.HasValue;
        
        public DateTime? WhenPasswordChanged { get; private set; }
        
        public bool IsLockable { get; private set; }
        
        public int SignInAttempts { get; private set; }
        
        public DateTime? WhenLocked { get; private set; }
        
        public bool IsLocked => this.WhenLocked.HasValue;
        
        public DateTime? WhenSignedIn { get; private set; }
        
        public Profile Profile { get; private set; }

        public IReadOnlyList<SecurityTokenMapping> SecurityTokenMappings => this._securityTokenMappings.AsReadOnly();

        public IReadOnlyList<PasswordHistory> PasswordHistories => this._passwordHistories.AsReadOnly();

        public IReadOnlyList<SignInHistory> SignInHistories => this._signInHistories.AsReadOnly();

        public IReadOnlyList<UserRole> UserRoles => this._userRoles.AsReadOnly();

        public DateTime WhenCreated { get; private set; }

        public void AddFailedLoginAttempt(DateTime whenAttempted)
        {
            this.SignInAttempts++;
            this._signInHistories.Add(new SignInHistory(Guid.NewGuid(), whenAttempted, SignInHistoryType.Failure));
        }

        public void ChangePasswordAndAddToHistory(string newPassword, DateTime whenChanged)
        {
            this.PasswordHash = newPassword;
            this.WhenPasswordChanged = whenChanged;
            this._passwordHistories.Add(new PasswordHistory(Guid.NewGuid(), this.PasswordHash, whenChanged));
        }

        public bool CheckAndApplyAccountLock(int maxLoginAttempts, DateTime whenLocked)
        {
            if (this.IsLockable && !this.IsLocked && this.SignInAttempts >= maxLoginAttempts)
            {
                this.WhenLocked = whenLocked;
                this.AddDomainEvent(new AccountLockedEvent());
            }

            return this.IsLocked;
        }

        public SecurityTokenMapping GenerateNewAccountConfirmationToken(DateTime whenCreated, DateTime whenExpires)
        {
            var token =
                this.SecurityTokenMappings.FirstOrDefault(m =>
                    m.WhenUsed == null && m.WhenExpires >= whenCreated &&
                    m.Purpose == SecurityTokenPurpose.AccountConfirmation);
            if (token == null)
            {
                token = new SecurityTokenMapping(Guid.NewGuid(), SecurityTokenPurpose.AccountConfirmation, whenCreated,
                    whenExpires);
                this._securityTokenMappings.Add(token);
            }

            this.AddDomainEvent(new GenerateAccountConfirmationTokenGeneratedEvent());

            return token;
        }

        public SecurityTokenMapping GenerateNewPasswordResetToken(DateTime whenCreated, DateTime whenExpires)
        {
            var token =
                this.SecurityTokenMappings.FirstOrDefault(m =>
                    m.WhenUsed == null && m.WhenExpires >= whenCreated &&
                    m.Purpose == SecurityTokenPurpose.PasswordReset);
            if (token == null)
            {
                token = new SecurityTokenMapping(Guid.NewGuid(), SecurityTokenPurpose.PasswordReset, whenCreated,
                    whenExpires);
                this._securityTokenMappings.Add(token);
            }

            this.AddDomainEvent(new PasswordResetTokenGeneratedEvent(this.Id, token.Token));
            return token;
        }

        public void CompleteTokenLifecycle(string token, DateTime usedOn)
        {
            var securityTokenMapping = this._securityTokenMappings.First(x => x.Token == token);
            securityTokenMapping.MarkUsed(usedOn);
        }

        public void UpdateValidLoginProperties(DateTime whenHappened)
        {
            this.SignInAttempts = 0;
            this.WhenSignedIn = whenHappened;
            this._signInHistories.Add(new SignInHistory(Guid.NewGuid(), whenHappened, SignInHistoryType.Success));
        }

        public bool IsPasswordInHistory(int historicalLimit, Func<string, bool> hasher)
        {
            var previousPasswords = this._passwordHistories.OrderByDescending(x => x.WhenUsed)
                .Take(historicalLimit);

            return previousPasswords.Any(previousPassword =>
                hasher(previousPassword.PasswordHash));
        }

        public void VerifyAccountAndSetPassword(string password, DateTime whenConfirmed)
        {
            this.ChangePasswordAndAddToHistory(password, whenConfirmed);
            this.WhenVerified = whenConfirmed;
        }

        public void RandomizePassword(string newPassword, DateTime whenChanged)
        {
            this.WhenPasswordChanged = whenChanged;
            this.PasswordHash = newPassword;
        }

        public bool CheckAndApplyAccountLock(DateTime whenLocked)
        {
            if (this.IsLockable && !this.IsLocked)
            {
                this.WhenLocked = whenLocked;
            }

            return this.IsLocked;
        }

        public void UnlockAccount(DateTime whenHappened, DateTime whenPasswordTokenExpires)
        {
            this.WhenLocked = null;
            this.SignInAttempts = 0;
            this.GenerateNewPasswordResetToken(whenHappened, whenPasswordTokenExpires);
        }

        public void VerifyAccount(DateTime whenHappened)
        {
            this.WhenVerified = whenHappened;
        }


    }
}
