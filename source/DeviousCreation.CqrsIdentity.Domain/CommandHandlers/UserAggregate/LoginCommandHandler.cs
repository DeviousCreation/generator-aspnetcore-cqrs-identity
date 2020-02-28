// TOKEN_COPYRIGHT_TEXT

using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MaybeMonad;
using MediatR;
using Microsoft.Extensions.Options;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<LoginCommandResult, ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IdentitySettings _identitySettings;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IClock _clock;
        private readonly IPasswordGenerator _passwordGenerator;

        public LoginCommandHandler(IUserRepository userRepository, IOptions<IdentitySettings> identitySettings, IPasswordHasher passwordHasher, IClock clock, IPasswordGenerator passwordGenerator)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._identitySettings = identitySettings.Value;
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._passwordGenerator = passwordGenerator ?? throw new ArgumentNullException(nameof(passwordGenerator));
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
        }

        public async Task<Result<LoginCommandResult, ErrorData>> Handle(
            LoginCommand request, CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._userRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return Result.Fail<LoginCommandResult, ErrorData>(new ErrorData(
                    ErrorCodes.SavingChanges, "Failed To Save Database"));
            }

            return result;
        }

        private async Task<Result<LoginCommandResult, ErrorData>> Process(
            LoginCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var userMaybe = await this._userRepository.FindByEmailAddress(request.EmailAddress, cancellationToken);
            

            if (userMaybe.HasNoValue)
            {
                return Result.Fail<LoginCommandResult, ErrorData>(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            if (user.IsLockable && user.IsLocked)
            {
                return Result.Fail<LoginCommandResult, ErrorData>(new ErrorData(
                    ErrorCodes.AccountIsLocked, "Account Lock"));
            }

            if (!this._passwordHasher.ValidatePassword(request.Password, user.PasswordHash))
            {
                user.AddFailedLoginAttempt(whenHappened);
                if (user.CheckAndApplyAccountLock(this._identitySettings.FailedLoginAttemptsThreshold, whenHappened))
                {
                    user.RandomizePassword(
                        this._passwordHasher.HashPassword(this._passwordGenerator.Generate()),
                        whenHappened);
                }

                this._userRepository.Update(user);
                return Result.Fail<LoginCommandResult, ErrorData>(new ErrorData(
                    ErrorCodes.PasswordNotCorrect, "Password not valid"));
            }

            LoginCommandResult.LoginResultStatus loginResultStatus = 0;


            if (this._identitySettings.AccountsMustBeVerified && !user.IsVerified)
            {
                loginResultStatus |= LoginCommandResult.LoginResultStatus.Unconfirmed;
                return Result.Ok<LoginCommandResult, ErrorData>(
                    new LoginCommandResult(user.Id, loginResultStatus));
            }

            user.UpdateValidLoginProperties(whenHappened);
            this._userRepository.Update(user);

           if (user.AuthenticatorApps.Any(x => x.WhenRevoked == null))
           {
               loginResultStatus |= LoginCommandResult.LoginResultStatus.AuthAppEnabled;
           }

           if (user.AuthenticatorDevices.Any(x => x.WhenRevoked == null))
           {
               loginResultStatus |= LoginCommandResult.LoginResultStatus.AuthDeviceEnabled;
           }

            if (!this._identitySettings.PasswordsCanExpire)
            {
                loginResultStatus |= LoginCommandResult.LoginResultStatus.Valid;
                return Result.Ok<LoginCommandResult, ErrorData>(
                    new LoginCommandResult(user.Id, loginResultStatus));
            }

            var passwordAge = (int)(whenHappened - (user.WhenPasswordChanged ?? user.WhenCreated).ToUniversalTime()).TotalDays;
            if (passwordAge >= this._identitySettings.MaxPasswordAgeDays)
            {
                loginResultStatus |= LoginCommandResult.LoginResultStatus.PasswordExpired;
                return Result.Ok<LoginCommandResult, ErrorData>(new LoginCommandResult(user.Id,
                    loginResultStatus));
            }

            loginResultStatus |= LoginCommandResult.LoginResultStatus.Valid;
            return Result.Ok<LoginCommandResult, ErrorData>(new LoginCommandResult(
                user.Id, loginResultStatus));
        }
    }
}