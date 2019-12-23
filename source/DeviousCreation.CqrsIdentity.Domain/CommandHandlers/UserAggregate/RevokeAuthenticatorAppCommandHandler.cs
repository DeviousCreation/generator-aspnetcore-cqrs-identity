using System.Linq;
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
    public class
        RevokeAuthenticatorAppCommandHandler : IRequestHandler<RevokeAuthenticatorAppCommand, ResultWithError<ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IClock _clock;
        private readonly ICurrentUserService _currentUserService;

        public RevokeAuthenticatorAppCommandHandler(IUserRepository userRepository, IClock clock, ICurrentUserService currentUserService)
        {
            this._userRepository = userRepository;
            this._clock = clock;
            this._currentUserService = currentUserService;
        }

        public async Task<ResultWithError<ErrorData>> Handle(RevokeAuthenticatorAppCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(RevokeAuthenticatorAppCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var userMaybe = await this._userRepository.Find(this._currentUserService.CurrentUser.Value.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            if (user.AuthenticatorApps.Any(x => x.WhenRevoked != null))
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.AuthenticatorAppAlreadyEnrolled));
            }

            user.RevokeAuthenticatorApp(whenHappened);

            return ResultWithError.Ok<ErrorData>();
        }
    }
}