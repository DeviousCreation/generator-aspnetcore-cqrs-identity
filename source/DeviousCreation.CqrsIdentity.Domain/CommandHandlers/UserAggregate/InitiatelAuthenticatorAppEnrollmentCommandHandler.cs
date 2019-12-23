using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using Microsoft.Extensions.Options;
using OtpNet;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class InitiatelAuthenticatorAppEnrollmentCommandHandler : IRequestHandler<InitiatelAuthenticatorAppEnrollmentCommand, Result<InitiatelAuthenticatorAppEnrollmentCommandResult, ErrorData>>
    {

        private ICurrentUserService _currentUserService;

        public InitiatelAuthenticatorAppEnrollmentCommandHandler(ICurrentUserService currentUserService)
        {
            this._currentUserService = currentUserService;
        }

        

        public async Task<Result<InitiatelAuthenticatorAppEnrollmentCommandResult, ErrorData>> Handle(InitiatelAuthenticatorAppEnrollmentCommand request, CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return Result.Fail<InitiatelAuthenticatorAppEnrollmentCommandResult, ErrorData>(new ErrorData(ErrorCodes.UserNotFound));
            }

            var key = KeyGeneration.GenerateRandomKey();
            var keyAsBase32String = Base32Encoding.ToString(key);
            

            return Result.Ok<InitiatelAuthenticatorAppEnrollmentCommandResult, ErrorData>(
                new InitiatelAuthenticatorAppEnrollmentCommandResult(keyAsBase32String));
        }

        
    }
}
