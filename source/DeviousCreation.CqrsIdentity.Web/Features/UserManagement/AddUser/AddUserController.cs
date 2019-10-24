// TOKEN_COPYRIGHT_TEXT

using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Features.UserManagement.AddUser
{
    public class AddUserController : Controller
    {
        private readonly IMediator _mediator;

        public AddUserController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        public IActionResult AddUser()
        {
            return this.View();
        }

        public async Task<IActionResult> AddUser(AddUserModel model)
        {
            if (this.ModelState.IsValid)
            {
                var result =
                     await this._mediator.Send(new CreateUserCommand(model.EmailAddress, model.Username, model.IsLockable));
            }

            return this.View();
        }
    }
}