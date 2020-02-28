using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using NodaTime;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class UpdateUserDetailsCommandHandler : IRequestHandler<UpdateUserDetailsCommand, ResultWithError<ErrorData>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IClock _clock;

        public UpdateUserDetailsCommandHandler(IUserRepository userRepository, IClock clock)
        {
            this._userRepository = userRepository;
            this._clock = clock;
        }

        public async Task<ResultWithError<ErrorData>> Handle(UpdateUserDetailsCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(UpdateUserDetailsCommand request, CancellationToken cancellationToken)
        {
            var whenHappened = this._clock.GetCurrentInstant().ToDateTimeUtc();
            var userMaybe = await this._userRepository.Find(request.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;
            user.UpdateProfile(request.FirstName, request.LastName, request.EmailAddress);
            user.SetAdminStatus(request.IsAdmin);
            user.SetLockableStatus(request.IsLockable);
            user.SetRoles(request.Roles);

            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}
