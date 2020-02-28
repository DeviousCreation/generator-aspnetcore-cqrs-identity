// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Core;
using MediatR;
using ResultMonad;

namespace DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate
{
    public class CreateInitialUserCommand : IRequest<ResultWithError<ErrorData>>
    {
        public CreateInitialUserCommand(string emailAddress, string password, string firstName,
            string lastName)
        {
            this.EmailAddress = emailAddress;
            this.Password = password;
            this.FirstName = firstName;
            this.LastName = lastName;
        }

        public string EmailAddress { get; }

        public string Password { get; }

        public string FirstName { get; }

        public string LastName { get; }
    }
}