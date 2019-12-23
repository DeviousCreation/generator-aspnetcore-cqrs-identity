using System;
using System.Collections.Generic;
using System.Text;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class EnrollAuthenticatorAppCommand : IRequest<ResultWithError<ErrorData>>
    {
        public EnrollAuthenticatorAppCommand(string key, string code)
        {
            this.Key = key;
            this.Code = code;
        }
        public string Key { get; }
        public string Code { get; }
    }

    public class InitiatelAuthenticatorAppEnrollmentCommand : IRequest<Result<InitiatelAuthenticatorAppEnrollmentCommandResult, ErrorData>>
    {

    }
}
