// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using Fido2NetLib;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class EnrollDeviceCommand : IRequest<Result<EnrollDeviceCommandResult, ErrorData>>
    {
        public EnrollDeviceCommand(string name, AuthenticatorAttestationRawResponse authenticatorAttestationRawResponse,
            CredentialCreateOptions credentialCreateOptions)
        {
            this.AuthenticatorAttestationRawResponse = authenticatorAttestationRawResponse;
            this.CredentialCreateOptions = credentialCreateOptions;
            this.Name = name;
        }

        public AuthenticatorAttestationRawResponse AuthenticatorAttestationRawResponse { get; }

        public CredentialCreateOptions CredentialCreateOptions { get; }

        public string Name { get; }
    }
}