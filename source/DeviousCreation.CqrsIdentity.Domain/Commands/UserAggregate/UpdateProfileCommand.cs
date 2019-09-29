using System;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public sealed class UpdateProfileCommand : IRequest<ResultWithError<ErrorData>>
    {
        public UpdateProfileCommand(Guid userId, string firstName, string lastName)
        {
            this.UserId = userId;
            this.FirstName = firstName;
            this.LastName = lastName;
        }
        public string FirstName { get; }
        public string LastName { get; }
        public Guid UserId { get; set; }
    }
}