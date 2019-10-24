// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Core.Settings
{
    public sealed class IdentitySettings
    {
        public bool UseEmailAddressAsUsername { get; set; }

        public int FailedLoginAttemptsThreshold { get; set; }

        public bool AccountsMustBeVerified { get; set; }

        public bool PasswordsCanExpire { get; set; }

        public int MaxPasswordAgeDays { get; set; }

        public bool ValidatePasswordAgainstHistory { get; set; }

        public int PreviousPasswordCheck { get; set; }

        public int ConfirmationTokenLifetime { get; set; }

        public int PasswordTokenLifetime { get; set; }

        public bool EmailAddressMustBeUnique { get; set; }

        public bool RegisteredAccountsLock { get; set; }
    }
}