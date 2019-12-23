// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core.Contracts;
using EzPasswordValidator.Checks;

namespace DeviousCreation.CqrsIdentity.Core
{
    public class PasswordValidator : IPasswordValidator
    {
        public bool IsValid(string password)
        {
            //var validator = new EzPasswordValidator.Validators.PasswordValidator(CheckTypes.Basic);
            //return validator.Validate(password);

            return true;
        }
    }
}