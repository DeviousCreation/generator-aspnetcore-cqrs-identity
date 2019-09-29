using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.PasswordReset
{
    public class PasswordResetController : Controller
    {
        private readonly IMediator _mediator;

        public PasswordResetController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet("request-password-reset")]
        public IActionResult RequestPasswordReset()
        {
            return this.View();
        }

        [HttpPost("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset(RequestPasswordResetModel model)
        {
            var result = await this._mediator.Send(new RequestPasswordResetCommand(model.Credential));
            return this.View();
        }

        [HttpGet("reset-password")]
        public IActionResult ResetPassword()
        {
            return this.View();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await this._mediator.Send(new ResetPasswordCommand(model.Token, model.NewPassword));
                if (result.IsSuccess)
                {
                    return this.RedirectToAction("SignIn", "SignIn");
                }
            }

            return this.View();
        }

    }

    public class RequestPasswordResetModel
    {
        public string Credential { get; set; }
    }

    public class ResetPasswordModel
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
