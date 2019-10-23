using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class VerifyAccountAndSetPasswordCommandHandler : IRequestHandler<VerifyAccountAndSetPasswordCommand, ResultWithError<ErrorData>>
    {
        private readonly IClock _clock;
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPasswordValidator _passwordValidator;

        public VerifyAccountAndSetPasswordCommandHandler(IUserRepository userRepository, IClock clock, IPasswordHasher passwordHasher, IPasswordValidator passwordValidator)
        {
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._passwordValidator = passwordValidator ?? throw new ArgumentNullException(nameof(passwordValidator));
        }

        public async Task<ResultWithError<ErrorData>> Handle(VerifyAccountAndSetPasswordCommand request,
            CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(VerifyAccountAndSetPasswordCommand request,
            CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var userResult =
                await this._userRepository.FindByUserBySecurityToken(request.Token, whenHappened, cancellationToken);
            if (userResult.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userResult.Value;

            if (user.IsVerified)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserIsAlreadyVerified));
            }

            if (!this._passwordValidator.IsValid(request.Password))
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.PasswordTooWeak));
            }

            user.VerifyAccount(whenHappened);

            user.ChangePasswordAndAddToHistory(this._passwordHasher.HashPassword(request.Password), whenHappened);

            user.CompleteTokenLifecycle(request.Token, whenHappened);
            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}