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
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, ResultWithError<ErrorData>>
    {
        private readonly IUserRepository _userRepository;

        public UpdateProfileCommandHandler(IUserRepository userRepository)
        {
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<ResultWithError<ErrorData>> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            var userMaybe = await this._userRepository.Find(request.UserId, cancellationToken);
            if (userMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.UserNotFound));
            }

            var user = userMaybe.Value;

            user.Profile.UpdateProfile(request.FirstName, request.LastName);
            this._userRepository.Update(user);
            return ResultWithError.Ok<ErrorData>();
        }
    }
}
