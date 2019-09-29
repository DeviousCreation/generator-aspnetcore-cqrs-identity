using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.SignIn
{
    public class SignInController : Controller
    {
        private readonly IMediator _mediator;

        public SignInController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet("login")]
        public IActionResult SignIn()
        {
            return this.View();
        }

        [HttpPost("login")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignIn(SignInModel model)
        {
            if (this.ModelState.IsValid)
            {
                var result = await this._mediator.Send(new LoginCommand(model.Credential, model.Password));
                if (result.IsSuccess)
                {
                    return this.RedirectToAction("Index", "Home");
                }
            }

            return this.View(model);
        }
    }
}
