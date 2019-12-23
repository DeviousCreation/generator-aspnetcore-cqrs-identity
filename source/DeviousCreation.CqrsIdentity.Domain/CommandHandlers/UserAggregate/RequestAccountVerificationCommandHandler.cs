// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MaybeMonad;
using MediatR;
using Microsoft.Extensions.Options;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class
        RequestAccountVerificationCommandHandler : IRequestHandler<RequestAccountVerificationCommand,
            ResultWithError<ErrorData>>
    {
        private readonly IdentitySettings _identitySettings;
        private readonly IClock _clock;
        private readonly IUserRepository _userRepository;

        public RequestAccountVerificationCommandHandler(IOptions<IdentitySettings> identitySettings, IClock clock, IUserRepository userRepository)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._identitySettings = identitySettings.Value;
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<ResultWithError<ErrorData>> Handle(
            RequestAccountVerificationCommand request, CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._userRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return ResultWithError.Fail(new ErrorData(
                    ErrorCodes.SavingChanges, "Failed To Save Database"));
            }

            return result;
        }

        private async Task<ResultWithError<ErrorData>> Process(
            RequestAccountVerificationCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();

            var userMaybe = await this._userRepository.FindByUsername(request.Credential, cancellationToken);
            

            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            if (user.IsVerified)
            {
                return ResultWithError.Fail(new ErrorData(
                    ErrorCodes.UserIsAlreadyVerified));
            }

            var token = user.GenerateNewAccountConfirmationToken(
                whenHappened,
                whenHappened.AddHours(this._identitySettings.ConfirmationTokenLifetime));

            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}