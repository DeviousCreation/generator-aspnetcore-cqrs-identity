// TOKEN_COPYRIGHT_TEXT

using System;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate
{
    public sealed class LoginCommandResult
    {
        public LoginCommandResult(Guid userId, LoginResultStatus status)
        {
            this.UserId = userId;
            this.Status = status;
        }

        [Flags]
        public enum LoginResultStatus
        {
            Unconfirmed = 1,
            PasswordExpired = 2,
            Valid = 4,
            AuthAppEnabled = 8,
            AuthDeviceEnabled = 16,
        }

        public Guid UserId { get; }

        public LoginResultStatus Status { get; }
    }
}