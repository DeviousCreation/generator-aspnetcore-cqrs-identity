using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.AccountValidation
{
    public class AccountValidationController : Controller
    {
        private readonly IMediator _mediator;

        public AccountValidationController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        public IActionResult RequestAccountVerification()
        {
            return this.View();
        }

        public async Task<IActionResult> RequestAccountVerification(AccountVerificationModel model)
        {
            var result = await this._mediator.Send(new RequestAccountVerificationCommand(model.Credential));
            return this.View();
        }

        [HttpGet("verify-account/{token}")]
        public IActionResult VerifyAccount(string token)
        {
            var verifyAccountModel = new VerifyAccountModel(token);
            return this.View(verifyAccountModel);
        }

        [HttpPost("verify-account")]
        public async Task<IActionResult> VerifyAccount(VerifyAccountModel model)
        {
            if (this.ModelState.IsValid)
            {
                var result = await this._mediator.Send(new VerifyAccountAndSetPasswordCommand(model.Token, model.Password));
                if (result.IsSuccess)
                {
                    return this.RedirectToAction("SignIn", "SignIn");
                }
            }

            return this.View();
        }
    }

    public class AccountVerificationModel
    {
        public string Credential { get; set; }
    }

    public class VerifyAccountModel
    {
        public VerifyAccountModel()
        {
            
        }
        public VerifyAccountModel(string token)
        {
            Token = token;
        }

        public string Token { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }
}
