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
    public class RequestPasswordResetCommandHandler : IRequestHandler<RequestPasswordResetCommand, ResultWithError<ErrorData>>
    {
        private readonly IClock _clock;
        private readonly IdentitySettings _identitySettings;
        private readonly IUserRepository _userRepository;

        public RequestPasswordResetCommandHandler(IClock clock, IOptions<IdentitySettings> identitySettings, IUserRepository userRepository)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._identitySettings = identitySettings.Value;
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<ResultWithError<ErrorData>> Handle(RequestPasswordResetCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(RequestPasswordResetCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();

            var userMaybe = await this._userRepository.FindByEmailAddress(request.EmailAddress, cancellationToken);

            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            if (!user.IsVerified)
            {
                return ResultWithError.Fail(new ErrorData(
                    ErrorCodes.UserIsNotVerified));
            }

            var token = user.GenerateNewPasswordResetToken(
                whenHappened,
                whenHappened.AddHours(this._identitySettings.PasswordTokenLifetime));

            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}