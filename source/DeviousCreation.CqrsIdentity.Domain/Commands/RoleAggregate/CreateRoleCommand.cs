using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.RoleAggregate
{
    public class CreateRoleCommand : IRequest<ResultWithError<ErrorData>>
    {
    }
}
