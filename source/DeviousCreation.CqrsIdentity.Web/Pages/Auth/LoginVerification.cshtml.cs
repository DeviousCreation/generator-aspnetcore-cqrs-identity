using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [Authorize(AuthenticationSchemes = "login-partial")]
    public class LoginVerification : PageModel
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMediator _mediator;

        public LoginVerification([NotNull] IMediator mediator, [NotNull] IAuthenticationService authenticationService)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        [TempData]
        public PrgState PrgState { get; set; }

        [BindProperty]
        public Model PageModel { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new ValidateAuthenticatorAppCommand(this.PageModel.Code));
            if (result.IsSuccess)
            {
                await this._authenticationService.SignInFromPartial();
                return this.RedirectToPage("/Dashboard/Index");
            }

            this.PrgState = PrgState.Failed;
            return this.RedirectToPage();
        }

        public class Model
        {
            public string Code { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.Code).NotEmpty();
            }
        }
    }
}