using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.RoleAggregate
{
    public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, ResultWithError<ErrorData>>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IRoleQueries _roleQueries;

        public async Task<ResultWithError<ErrorData>> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._roleRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return ResultWithError.Fail(new ErrorData(
                    ErrorCodes.SavingChanges, "Failed To Save Database"));
            }

            return result;
        }

        public async Task<ResultWithError<ErrorData>> Process(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            var roleMaybe = await _roleRepository.Find(request.RoleId, cancellationToken);
            if (roleMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.RoleNotFound));
            }

            var prensenceResult = await _roleQueries.CheckForRoleUsageById(request.RoleId, cancellationToken);
            if (prensenceResult.IsPresent)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.RoleInUse));
            }

            var role = roleMaybe.Value;
            role.FlagAsDeleted();

            _roleRepository.Update(role);

            return ResultWithError.Ok<ErrorData>();
        }
    }
}