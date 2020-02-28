using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class UpdateUserDetailsCommand : IRequest<ResultWithError<ErrorData>>
    {
        private readonly List<Guid> _roles;

        public UpdateUserDetailsCommand(Guid userId, string firstName, string lastName, string emailAddress,
            bool isAdmin, bool isLockable, List<Guid> roles)
        {
            this._roles = roles;
            this.UserId = userId;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddress;
            this.IsAdmin = isAdmin;
            this.IsLockable = isLockable;
        }

        public Guid UserId { get; }

        public string FirstName { get; }

        public string LastName { get; }

        public string EmailAddress { get; }

        public bool IsAdmin { get; }

        public bool IsLockable { get; }

        public IReadOnlyList<Guid> Roles => this._roles.AsReadOnly();
    }
}