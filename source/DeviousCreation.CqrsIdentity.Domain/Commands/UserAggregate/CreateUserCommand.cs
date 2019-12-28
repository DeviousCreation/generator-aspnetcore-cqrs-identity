// TOKEN_COPYRIGHT_TEXT

using System;
using System.Collections.Generic;
using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class CreateUserCommand : IRequest<ResultWithError<ErrorData>>
    {
        private readonly List<Guid> _roles;

        public CreateUserCommand(string emailAddress, string username, bool isLockable, bool isAdmin, List<Guid> roles)
        {
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.IsLockable = isLockable;
            this.IsAdmin = isAdmin;
            if (roles == null)
            {
                this._roles = new List<Guid>();
            }
            else
            {
                this._roles = roles;
            }
        }


        public string EmailAddress { get; }

        public string Username { get; }

        public bool IsLockable { get; }

        public bool IsAdmin { get; }

        public IReadOnlyList<Guid> Roles => this._roles.AsReadOnly();
    }
}