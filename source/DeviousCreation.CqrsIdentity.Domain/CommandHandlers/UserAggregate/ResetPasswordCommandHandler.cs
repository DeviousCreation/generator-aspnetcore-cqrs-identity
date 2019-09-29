using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, ResultWithError<ErrorData>>
    {
        private IUserRepository _userRepository;
        private Instant _instant;
        private IPasswordValidator _passwordValidator;
        private IdentitySettings _identitySettings;
        private IPasswordHasher _passwordHasher;

        public async Task<ResultWithError<ErrorData>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._userRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.SavingChanges,
                    "Failed To Save Database"));
            }

            return result;
        }

        private async Task<ResultWithError<ErrorData>> Process(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._instant.ToDateTimeUtc();
            var userMaybe =
                await this._userRepository.FindByUserBySecurityToken(request.Token, whenHappened);

            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            if (!_passwordValidator.IsValid(request.NewPassword))
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

            user.ChangePasswordAndAddToHistory(this._passwordHasher.HashPassword(request.NewPassword),
                whenHappened);
            user.CompleteTokenLifecycle(request.Token, whenHappened);
            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}
