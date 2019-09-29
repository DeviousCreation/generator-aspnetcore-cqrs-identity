using System;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate
{
    public sealed class LoginCommandResult
    {
        public Guid UserId { get; }
        public LoginResultStatus Status { get; }
        

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
            Valid = 4
        }
    }
}
