// TOKEN_COPYRIGHT_TEXT

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.AccountValidation
{
    public class VerifyAccountModel
    {
        public VerifyAccountModel()
        {
        }

        public VerifyAccountModel(string token)
        {
            this.Token = token;
        }

        public string Token { get; set; }

        public string Password { get; set; }

        public string PasswordConfirmation { get; set; }
    }
}