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
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using MediatR;
using Microsoft.Extensions.Options;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, ResultWithError<ErrorData>>
    {
        private readonly IClock _clock;
        private readonly IdentitySettings _identitySettings;
        private readonly IPasswordGenerator _passwordGenerator;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserQueries _userQueries;
        private readonly IUserRepository _userRepository;

        public CreateUserCommandHandler(IUserRepository userRepository, IUserQueries userQueries,
            IPasswordGenerator passwordGenerator, IPasswordHasher passwordHasher,
            IOptions<IdentitySettings> identitySettings, IClock clock)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._passwordGenerator = passwordGenerator ?? throw new ArgumentNullException(nameof(passwordGenerator));
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._identitySettings = identitySettings.Value;
        }

        public async Task<ResultWithError<ErrorData>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
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
            CreateUserCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();

            var statusCheck = await this._userQueries.CheckForPresenceOfUserByUsername(request.Username,
                cancellationToken);

            if (statusCheck.IsPresent)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserIsAlreadyExists));
            }

           

            var user = new User(Guid.NewGuid(), request.EmailAddress, request.Username,
                this._passwordHasher.HashPassword(this._passwordGenerator.Generate()), request.IsLockable,
                this._clock.GetCurrentInstant().ToDateTimeUtc());

            user.GenerateNewAccountConfirmationToken(
                whenHappened, whenHappened.AddHours(this._identitySettings.ConfirmationTokenLifetime));
            this._userRepository.Add(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}