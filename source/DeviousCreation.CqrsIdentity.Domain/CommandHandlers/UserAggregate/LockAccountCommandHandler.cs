// TOKEN_COPYRIGHT_TEXT

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
    public class LockAccountCommandHandler : IRequestHandler<LockAccountCommand, ResultWithError<ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IClock _clock;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IPasswordGenerator _passwordGenerator;

        public LockAccountCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher, IPasswordGenerator passwordGenerator, IClock clock)
        {
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._passwordGenerator = passwordGenerator ?? throw new ArgumentNullException(nameof(passwordGenerator));
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
        }

        public async Task<ResultWithError<ErrorData>> Handle(LockAccountCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(LockAccountCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var userMaybe = await this._userRepository.Find(request.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;
            if (user.CheckAndApplyAccountLock(whenHappened))
            {
                user.RandomizePassword(
                    this._passwordHasher.HashPassword(this._passwordGenerator.Generate()),
                    whenHappened);
                this._userRepository.Update(user);
                return ResultWithError.Ok<ErrorData>();
            }

            return ResultWithError.Fail(new ErrorData(ErrorCodes.AccountCannotBeLocked));
        }
    }
}