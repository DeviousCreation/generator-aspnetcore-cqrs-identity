using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using OtpNet;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class
        ValidateAuthenticatorAppCommandHandler : IRequestHandler<ValidateAuthenticatorAppCommand, ResultWithError<ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly ICurrentUserService _currentUserService;
        public ValidateAuthenticatorAppCommandHandler(IUserRepository userRepository, ICurrentUserService currentUserService)
        {
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this._currentUserService = currentUserService ?? throw new ArgumentNullException(nameof(currentUserService));
        }

        public async Task<ResultWithError<ErrorData>> Handle(ValidateAuthenticatorAppCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(ValidateAuthenticatorAppCommand request, CancellationToken cancellationToken)
        {
            var userMaybe = await this._userRepository.Find(this._currentUserService.CurrentUser.Value.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            var authApp = user.AuthenticatorApps.SingleOrDefault(x => x.WhenRevoked == null);
            
            if (authApp == null)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.AuthenticatorAppAlreadyEnrolled));
            }

            var secretBytes = Base32Encoding.ToBytes(authApp.Key);
            var topt = new Totp(secretBytes);
            var isVerified = topt.VerifyTotp(request.Token, out _);

            return isVerified
                ? ResultWithError.Ok<ErrorData>()
                : ResultWithError.Fail(new ErrorData(ErrorCodes.FailedVerifyingAuthenticatorCode));
        }
    }
}