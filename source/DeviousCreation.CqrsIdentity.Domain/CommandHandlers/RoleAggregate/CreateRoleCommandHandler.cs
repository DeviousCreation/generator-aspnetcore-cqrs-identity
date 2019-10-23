using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.RoleAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.CommandHandlers.RoleAggregate
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Result<CreateRoleCommandResult, ErrorData>>
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IRoleQueries _roleQueries;

        public CreateRoleCommandHandler(IRoleRepository roleRepository, IRoleQueries roleQueries)
        {
            _roleRepository = roleRepository ?? throw new ArgumentNullException(nameof(roleRepository));
            _roleQueries = roleQueries ?? throw new ArgumentNullException(nameof(roleQueries));
        }

        public async Task<Result<CreateRoleCommandResult, ErrorData>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var result = await this.Process(request, cancellationToken);
            var dbResult = await this._roleRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (!dbResult)
            {
                return Result.Fail<CreateRoleCommandResult, ErrorData>(new ErrorData(ErrorCodes.SavingChanges,
                    "Failed To Save Database"));
            }

            return result;
        }

        private async Task<Result<CreateRoleCommandResult, ErrorData>> Process(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var presenceResult = await _roleQueries.CheckForPresenceOfRoleByName(request.Name, cancellationToken);
            if (presenceResult.IsPresent)
            {
                return Result.Fail<CreateRoleCommandResult, ErrorData>(new ErrorData(ErrorCodes.RoleAlreadyExists));
            }

            var role = _roleRepository.Add(new Role(Guid.NewGuid(), request.Name));

            return Result.Ok<CreateRoleCommandResult, ErrorData>(new CreateRoleCommandResult(role.Id));
        }
    }
}