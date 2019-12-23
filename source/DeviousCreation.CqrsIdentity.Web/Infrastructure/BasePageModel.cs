using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Exceptions;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure
{
    public class BasePageModel : PageModel
    {
        private readonly IMediator _mediator;

        public BasePageModel([NotNull] IMediator mediator)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        protected async Task<CommandResult<TResponse>> ExecuteCommand<TResponse>(IRequest<TResponse> command, CancellationToken cancellationToken = default)
        {
            try
            {
                var result = await this._mediator.Send(command, cancellationToken);
                return CommandResult<TResponse>.Success(result);
            }
            catch (CustomException)
            {
                return CommandResult<TResponse>.Fail();
            }
        }

        protected class CommandResult<TResponse>
        {
            public static CommandResult<TResponse> Fail()
            {
                return new CommandResult<TResponse>();
            }

            public static CommandResult<TResponse> Success(TResponse response)
            {
                return new CommandResult<TResponse>(response);
            }

            private CommandResult()
            {
                this.IsSuccess = false;
            }

            private CommandResult(TResponse response)
            {
                this.IsSuccess = true;
                this.Response = response;
            }

            public bool IsSuccess { get; }

            public bool IsFailure => !this.IsSuccess;

            public TResponse Response { get; }
        }
    }
}