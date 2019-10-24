// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class ChangePasswordCommand : IRequest<ResultWithError<ErrorData>>
    {
        public ChangePasswordCommand(string currentPassword, string newPassword)
        {
            this.CurrentPassword = currentPassword;
            this.NewPassword = newPassword;
        }

        public string CurrentPassword { get; }

        public string NewPassword { get; }
    }
}