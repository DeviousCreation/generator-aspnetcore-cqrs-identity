// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.PasswordReset
{
    public class ResetPasswordModel
    {
        public string Token { get; set; }

        public string NewPassword { get; set; }
    }
}