// TOKEN_COPYRIGHT_TEXT

using System;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class UpdateProfileCommand : IRequest<ResultWithError<ErrorData>>
    {
        public UpdateProfileCommand(string firstName, string lastName, string emailAddress)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddress;
        }

        public string FirstName { get; }

        public string LastName { get; }

        public string EmailAddress { get; }
    }
}