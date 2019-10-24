// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class ResetPasswordCommand : IRequest<ResultWithError<ErrorData>>
    {
        public ResetPasswordCommand(string token, string newPassword)
        {
            this.Token = token;
            this.NewPassword = newPassword;
        }

        public string Token { get; }

        public string NewPassword { get; }
    }
}