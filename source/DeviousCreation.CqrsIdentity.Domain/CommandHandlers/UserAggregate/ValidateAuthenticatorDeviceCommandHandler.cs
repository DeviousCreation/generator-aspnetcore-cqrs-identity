using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using Fido2NetLib;
using Fido2NetLib.Objects;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class ValidateAuthenticatorDeviceCommandHandler : IRequestHandler<ValidateAuthenticatorDeviceCommand, Result<ValidateAuthenticatorDeviceCommandResult, ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IFido2 _fido2;
        private readonly ICurrentUserService _currentUserService;

        public ValidateAuthenticatorDeviceCommandHandler(IUserRepository userRepository, IFido2 fido2, ICurrentUserService currentUserService)
        {
            this._userRepository = userRepository;
            this._fido2 = fido2;
            this._currentUserService = currentUserService;
        }

        public async Task<Result<ValidateAuthenticatorDeviceCommandResult, ErrorData>> Handle(ValidateAuthenticatorDeviceCommand request, CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._userRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return Result.Fail<ValidateAuthenticatorDeviceCommandResult, ErrorData>(new ErrorData(
                    ErrorCodes.SavingChanges, "Failed To Save Database"));
            }

            return result;
        }

        private async Task<Result<ValidateAuthenticatorDeviceCommandResult, ErrorData>> Process(ValidateAuthenticatorDeviceCommand request, CancellationToken cancellationToken)
        {
            //var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return Result.Fail<ValidateAuthenticatorDeviceCommandResult, ErrorData>(new ErrorData(ErrorCodes.UserNotFound));
            }

            var userMaybe =
                await this._userRepository.Find(this._currentUserService.CurrentUser.Value.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return Result.Fail<ValidateAuthenticatorDeviceCommandResult, ErrorData>(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;
            var authenticatorDevice = user.AuthenticatorDevices.FirstOrDefault(x =>
                request.AuthenticatorAssertionRawResponse.Id.SequenceEqual(x.CredentialId));

            if (authenticatorDevice == null)
            {
                return Result.Fail<ValidateAuthenticatorDeviceCommandResult, ErrorData>(new ErrorData(ErrorCodes.DeviceNotFound));
            }
            
            var res = await this._fido2.MakeAssertionAsync(request.AuthenticatorAssertionRawResponse, request.AssertionOptions, authenticatorDevice.PublicKey, (uint)authenticatorDevice.Counter, @params => Task.FromResult(true));

            authenticatorDevice.UpdateCounter((int) res.Counter);

            return Result.Ok<ValidateAuthenticatorDeviceCommandResult, ErrorData>(new ValidateAuthenticatorDeviceCommandResult(res));
        }
    }
}
