// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Core.Constants
{
    public enum ErrorCodes
    {
        NotSet = 0,
        SavingChanges = 1,
        UserNotFound,
        AccountIsLocked,
        PasswordNotCorrect,
        PasswordTooWeak,
        PasswordInHistory,
        AccountCannotBeLocked,
        UserIsAlreadyVerified,
        UserIsAlreadyExists,
        EmailAddressInUse,
        RoleAlreadyExists,
        RoleInUse,
        RoleNotFound,
        SystemIsAlreadySetup,
        UserIsNotVerified,
        AuthenticatorAppAlreadyEnrolled,
        FailedVerifyingAuthenticatorCode,
        DeviceNameInUse,
        DeviceRegistrationFailed,
        FidoVerifcationFailed,
        DeviceNotFound,
        MfaCodeNotValid
    }
}