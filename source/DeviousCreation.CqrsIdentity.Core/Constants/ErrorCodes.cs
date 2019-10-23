namespace DeviousCreation.CqrsIdentity.Core.Constants
{
    public enum ErrorCodes
    {
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
    }
}