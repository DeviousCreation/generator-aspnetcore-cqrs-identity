using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Web.Features.Account.Registration
{
    public class RegistrationController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IdentitySettings _identitySettings;

        public RegistrationController(IMediator mediator, IOptions<IdentitySettings> identitySettings)
        {
            if (identitySettings == null)
            {
                throw new ArgumentNullException(nameof(identitySettings));
            }

            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._identitySettings = identitySettings.Value;
        }

        [HttpGet("register")]
        public IActionResult Register()
        {
            return this.View();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (this.ModelState.IsValid)
            {
                var res = await this._mediator.Send(new CreateUserCommand(model.EmailAddress, model.Username, this._identitySettings.RegisteredAccountsLock));
                return this.RedirectToAction("PostRegistration", "Registration");
            }
            return this.View();
        }

        public IActionResult PostRegistration()
        {
            return this.View();
        }
    }

    public class RegisterModel
    {
        public string EmailAddress { get; set; }
        public string Username { get; set; }
    }

    public class RegisterModelValidator : AbstractValidator<RegisterModel>
    {
        public RegisterModelValidator()
        {
            this.RuleFor(x => x.Username).NotEmpty();
            this.RuleFor(x => x.EmailAddress).EmailAddress().NotEmpty();
        }
    }

}
