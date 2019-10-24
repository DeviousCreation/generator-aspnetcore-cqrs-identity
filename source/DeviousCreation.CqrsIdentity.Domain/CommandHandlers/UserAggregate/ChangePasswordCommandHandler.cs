// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using Microsoft.Extensions.Options;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, ResultWithError<ErrorData>>
    {
        private readonly IClock _clock;
        private readonly ICurrentUserService _currentUserService;
        private readonly IdentitySettings _identitySettings;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPasswordValidator _passwordValidator;
        private readonly IUserRepository _userRepository;

        public ChangePasswordCommandHandler(ICurrentUserService currentUserService, IUserRepository userRepository,
            IPasswordHasher passwordHasher, IPasswordValidator passwordValidator, IClock clock,
            IOptions<IdentitySettings> identitySettings)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._currentUserService =
                currentUserService ?? throw new ArgumentNullException(nameof(currentUserService));
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._passwordValidator = passwordValidator ?? throw new ArgumentNullException(nameof(passwordValidator));
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._identitySettings = identitySettings.Value;
        }

        public async Task<ResultWithError<ErrorData>> Handle(
            ChangePasswordCommand request, CancellationToken cancellationToken)
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
            ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var userMaybe = await this._userRepository.Find(currentUserMaybe.Value.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            if (!this._passwordHasher.ValidatePassword(request.CurrentPassword, user.PasswordHash))
            {
                // todo: check about locking account
                return ResultWithError.Fail(new ErrorData(
                    ErrorCodes.PasswordNotCorrect, "Password is not correct"));
            }

            if (!this._passwordValidator.IsValid(request.NewPassword))
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.PasswordTooWeak, "Password is to weak"));
            }

            if (this._identitySettings.ValidatePasswordAgainstHistory && user.IsPasswordInHistory(
                    this._identitySettings.PreviousPasswordCheck,
                    s => this._passwordHasher.ValidatePassword(request.NewPassword, s)))
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.PasswordInHistory));
            }

            user.ChangePasswordAndAddToHistory(this._passwordHasher.HashPassword(request.NewPassword), whenHappened);

            this._userRepository.Update(user);

            return ResultWithError.Ok<ErrorData>();
        }
    }
}