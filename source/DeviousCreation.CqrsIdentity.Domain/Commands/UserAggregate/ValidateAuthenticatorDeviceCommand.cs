using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using Fido2NetLib;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class ValidateAuthenticatorDeviceCommand : IRequest<Result<ValidateAuthenticatorDeviceCommandResult, ErrorData>>
    {
        public ValidateAuthenticatorDeviceCommand(AuthenticatorAssertionRawResponse authenticatorAssertionRawResponse, AssertionOptions assertionOptions)
        {
            this.AuthenticatorAssertionRawResponse = authenticatorAssertionRawResponse;
            this.AssertionOptions = assertionOptions;
        }

        public AuthenticatorAssertionRawResponse AuthenticatorAssertionRawResponse { get; }

        public AssertionOptions AssertionOptions { get; }
    }
}
