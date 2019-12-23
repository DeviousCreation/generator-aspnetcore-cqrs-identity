using Fido2NetLib.Objects;

namespace DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate
{
    public class ValidateAuthenticatorDeviceCommandResult
    {
        public ValidateAuthenticatorDeviceCommandResult(AssertionVerificationResult assertionVerificationResult)
        {
            this.AssertionVerificationResult = assertionVerificationResult;
        }

        public AssertionVerificationResult AssertionVerificationResult { get; }
    }
}