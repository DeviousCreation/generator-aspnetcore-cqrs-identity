using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Events;
using MediatR;
using OtpNet;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class GenerateRemoteMultiFactorAuthCodeCommandHandler : IRequestHandler<GenerateRemoteMultiFactorAuthCodeCommand, ResultWithError<ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly ICurrentUserService _currentUserService;

        public GenerateRemoteMultiFactorAuthCodeCommandHandler(IUserRepository userRepository, ICurrentUserService currentUserService)
        {
            this._userRepository = userRepository;
            this._currentUserService = currentUserService;
        }

        public async Task<ResultWithError<ErrorData>> Handle(GenerateRemoteMultiFactorAuthCodeCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(GenerateRemoteMultiFactorAuthCodeCommand request, CancellationToken cancellationToken)
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var userMaybe =
                await this._userRepository.Find(this._currentUserService.CurrentUser.Value.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;
            var totp = new Totp(user.SecurityStamp.ToByteArray());

            var generated = totp.ComputeTotp();

            user.AddDomainEvent(new MfaTokenGeneratedEvent(
                request.TwoFactorProvider,
                user.Id,
                generated));

            return ResultWithError.Ok<ErrorData>();
        }
    }
}
