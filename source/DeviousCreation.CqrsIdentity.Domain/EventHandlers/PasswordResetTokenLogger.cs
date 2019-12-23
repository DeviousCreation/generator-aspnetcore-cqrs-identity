using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace DeviousCreation.CqrsIdentity.Domain.EventHandlers
{
    public class PasswordResetTokenLogger : INotificationHandler<PasswordResetTokenGeneratedEvent>
    {
        private ILogger _logger;

        public PasswordResetTokenLogger(ILogger<PasswordResetTokenLogger> logger)
        {
            this._logger = logger;
        }

        public Task Handle(PasswordResetTokenGeneratedEvent notification, CancellationToken cancellationToken)
        {
            this._logger.LogInformation(notification.Token);
            return Task.CompletedTask;
        }
    }
    
    public class AccountConfirmationTokenLogger : INotificationHandler<GenerateAccountConfirmationTokenGeneratedEvent>
    {
        private ILogger _logger;

        public AccountConfirmationTokenLogger(ILogger<PasswordResetTokenLogger> logger)
        {
            this._logger = logger;
        }

        public Task Handle(GenerateAccountConfirmationTokenGeneratedEvent notification, CancellationToken cancellationToken)
        {
            this._logger.LogInformation(notification.Token);
            return Task.CompletedTask;
        }
    }
}
