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
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, ResultWithError<ErrorData>>
    {
        private readonly IdentitySettings _identitySettings;
        private readonly IClock _clock;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPasswordValidator _passwordValidator;
        private readonly IUserRepository _userRepository;

        public ResetPasswordCommandHandler(IOptions<IdentitySettings> identitySettings, IClock clock, IPasswordHasher passwordHasher, IPasswordValidator passwordValidator, IUserRepository userRepository)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._identitySettings = identitySettings.Value;
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._passwordValidator = passwordValidator ?? throw new ArgumentNullException(nameof(passwordValidator));
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<ResultWithError<ErrorData>> Handle(
            ResetPasswordCommand request, CancellationToken cancellationToken)
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
            ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var userMaybe =
                await this._userRepository.FindByUserBySecurityToken(request.Token, whenHappened, cancellationToken);

            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            if (!this._passwordValidator.IsValid(request.NewPassword))
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.PasswordTooWeak, "Password is to weak"));
            }

            var user = userMaybe.Value;

            if (this._identitySettings.ValidatePasswordAgainstHistory && user.IsPasswordInHistory(
                    this._identitySettings.PreviousPasswordCheck,
                    s => this._passwordHasher.ValidatePassword(request.NewPassword, s)))
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.PasswordInHistory));
            }

            user.ChangePasswordAndAddToHistory(
                this._passwordHasher.HashPassword(request.NewPassword),
                whenHappened);
            user.CompleteTokenLifecycle(request.Token, whenHappened);
            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}