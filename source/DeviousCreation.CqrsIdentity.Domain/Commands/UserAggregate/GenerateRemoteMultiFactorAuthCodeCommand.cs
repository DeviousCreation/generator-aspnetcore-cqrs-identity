using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Constants;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class GenerateRemoteMultiFactorAuthCodeCommand : IRequest<ResultWithError<ErrorData>>
    {
        public GenerateRemoteMultiFactorAuthCodeCommand(RemoteMfaType twoFactorProvider)
        {
            this.TwoFactorProvider = twoFactorProvider;
        }

        public RemoteMfaType TwoFactorProvider { get; }
    }

    public class ValidateRemoteMultiFactorAuthCodeCommand : IRequest<ResultWithError<ErrorData>>
    {
        public ValidateRemoteMultiFactorAuthCodeCommand(string code)
        {
            this.Code = code;
        }

        public string Code { get; }
    }
}