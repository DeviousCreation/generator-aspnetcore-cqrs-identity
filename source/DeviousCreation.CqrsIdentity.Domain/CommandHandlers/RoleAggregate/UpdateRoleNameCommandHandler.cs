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
    public class UpdateRoleNameCommandHandler : IRequestHandler<UpdateRoleNameCommand, ResultWithError<ErrorData>>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IRoleQueries _roleQueries;

        public async Task<ResultWithError<ErrorData>> Handle(UpdateRoleNameCommand request, CancellationToken cancellationToken)
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

        private async Task<ResultWithError<ErrorData>> Process(UpdateRoleNameCommand request, CancellationToken cancellationToken)
        {
            var prensenceResult = await _roleQueries.CheckForPresenceOfRoleByNameWithIdExclusion(request.Name, request.RoleId, cancellationToken);
            if (prensenceResult.IsPresent)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.RoleAlreadyExists));
            }

            var roleMaybe = await _roleRepository.Find(request.RoleId, cancellationToken);
            if (roleMaybe.HasNoValue)
            {
                return ResultWithError.Fail(new ErrorData(ErrorCodes.RoleNotFound));
            }

            var role = roleMaybe.Value;

            role.UpdateName(request.Name);
            
            _roleRepository.Update(role);

            return ResultWithError.Ok<ErrorData>();


        }
    }
}