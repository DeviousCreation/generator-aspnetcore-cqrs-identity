// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using Fido2NetLib;
using Fido2NetLib.Objects;
using MediatR;
using Microsoft.Extensions.Options;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class
        EnrollDeviceCommandHandler : IRequestHandler<EnrollDeviceCommand, Result<EnrollDeviceCommandResult, ErrorData>>
    {
        private readonly IClock _clock;
        private readonly ICurrentUserService _currentUserService;
        private readonly IFido2 _fido2;
        private readonly SiteSettings _siteSettings;
        private readonly IUserRepository _userRepository;

        public EnrollDeviceCommandHandler(IUserRepository userRepository, IClock clock,
            ICurrentUserService currentUserService, IOptions<SiteSettings> siteSettings, IFido2 fido2)
        {
            this._userRepository = userRepository;
            this._clock = clock;
            this._currentUserService = currentUserService;
            this._fido2 = fido2;
            this._siteSettings = siteSettings.Value;
        }

        public async Task<Result<EnrollDeviceCommandResult, ErrorData>> Handle(EnrollDeviceCommand request,
            CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._userRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return Result.Fail<EnrollDeviceCommandResult, ErrorData>(new ErrorData(
                    ErrorCodes.SavingChanges, "Failed To Save Database"));
            }

            return result;
        }

        private async Task<Result<EnrollDeviceCommandResult, ErrorData>> Process(EnrollDeviceCommand request,
            CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return Result.Fail<EnrollDeviceCommandResult, ErrorData>(new ErrorData(ErrorCodes.UserNotFound));
            }

            var userMaybe =
                await this._userRepository.Find(this._currentUserService.CurrentUser.Value.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return Result.Fail<EnrollDeviceCommandResult, ErrorData>(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            Fido2.CredentialMakeResult credentialMakeResult;
            try
            {
                // 2. Verify and make the credentials
                Task<bool> IsCredentialIdUniqueToUser(IsCredentialIdUniqueToUserParams param)
                {
                    return Task.FromResult(user.AuthenticatorDevices.Count == 0);
                }

                credentialMakeResult = await this._fido2.MakeNewCredentialAsync(
                    request.AuthenticatorAttestationRawResponse,
                    request.CredentialCreateOptions,
                    IsCredentialIdUniqueToUser);
            }
            catch (Fido2VerificationException e)
            {
                return Result.Fail<EnrollDeviceCommandResult, ErrorData>(
                    new ErrorData(ErrorCodes.FidoVerifcationFailed));
            }

            user.EnrollAuthenticatorDevice(Guid.NewGuid(),
                whenHappened,
                credentialMakeResult.Result.PublicKey,
                credentialMakeResult.Result.CredentialId,
                credentialMakeResult.Result.Aaguid,
                Convert.ToInt32(credentialMakeResult.Result.Counter),
                request.Name,
                credentialMakeResult.Result.CredType
            );

            return Result.Ok<EnrollDeviceCommandResult, ErrorData>(new EnrollDeviceCommandResult(credentialMakeResult));
        }
    }
}