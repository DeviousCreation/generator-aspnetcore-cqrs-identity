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
    public class CreateInitialUserCommandHandler : IRequestHandler<CreateInitialUserCommand, ResultWithError<ErrorData>>
    {
        private readonly IClock _clock;
        private readonly IdentitySettings _identitySettings;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserQueries _userQueries;
        private readonly IUserRepository _userRepository;

        public CreateInitialUserCommandHandler(IUserRepository userRepository, IUserQueries userQueries,
            IPasswordHasher passwordHasher, IOptions<IdentitySettings> identitySettings, IClock clock)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            this._clock = clock ?? throw new ArgumentNullException(nameof(clock));
            this._identitySettings = identitySettings.Value;
        }

        public async Task<ResultWithError<ErrorData>> Handle(
            CreateInitialUserCommand request, CancellationToken cancellationToken)
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
            CreateInitialUserCommand request, CancellationToken cancellationToken)
        {
            var statusCheck = await this._userQueries.CheckForPresenceOfAnyUser(cancellationToken);

            if (statusCheck.IsPresent)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.SystemIsAlreadySetup));
            }

            var user = new User(Guid.NewGuid(), request.EmailAddress, request.Username,
                this._passwordHasher.HashPassword(request.Password), false, true,
                this._clock.GetCurrentInstant().ToDateTimeUtc());

            //user.UpdateProfile(request.FirstName, request.LastName);

            user.VerifyAccount(this._clock.GetCurrentInstant().ToDateTimeUtc());

            this._userRepository.Add(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}