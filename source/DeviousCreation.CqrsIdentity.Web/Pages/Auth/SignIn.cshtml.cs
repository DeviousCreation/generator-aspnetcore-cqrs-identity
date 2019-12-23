using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [ModelStatePersistence]
    public class SignIn : PageModel
    {
        private readonly IMediator _mediator;
        private readonly IAuthenticationService _authenticationService;
        private readonly SiteSettings _siteSettings;

        public SignIn([NotNull] IMediator mediator, [NotNull] IAuthenticationService authenticationService, IOptions<SiteSettings> siteSettings)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            this._siteSettings = siteSettings.Value;
        }

        [BindProperty]
        public Model PageModel { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new LoginCommand(this.PageModel.Credential, this.PageModel.Password));
            if (result.IsSuccess)
            {
                

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Upn, result.Value.UserId.ToString()),
                };

                
                    if (result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.AuthDeviceEnabled) ||
                        result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.AuthAppEnabled) ||
                        this._siteSettings.MfaEnforced)
                    {
                        await this._authenticationService.SignInPartial(result.Value.UserId, "/Auth/MfaSelection",
                            result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.PasswordExpired));

                        return this.RedirectToPage("/Auth/MfaSelection");
                    }

                    if (result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.PasswordExpired))
                    {
                    await this._authenticationService.SignInPartial(result.Value.UserId, "/Auth/PasswordUpdate",true);

                    return this.RedirectToPage("/Auth/PasswordUpdate");
                }

                    if (result.Value.Status == LoginCommandResult.LoginResultStatus.Valid)
                    {
                        await this._authenticationService.SignIn(result.Value.UserId);
                        return this.RedirectToPage("/Dashboard/Index");
                    }



            }

            return this.RedirectToPage();
        }

        public class Model
        {
            public string Credential { get; set; }

            public string Password { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.Credential).NotEmpty();
                this.RuleFor(x => x.Password).NotEmpty();
            }
        }
    }
}