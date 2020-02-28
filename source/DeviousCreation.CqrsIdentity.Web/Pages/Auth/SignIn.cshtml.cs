// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain.CommandResults.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    public sealed class SignIn : PrgPageModel<SignIn.Model>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMediator _mediator;
        private readonly SiteSettings _siteSettings;
        private IUserQueries _userQueries;

        public SignIn([NotNull] IMediator mediator, [NotNull] IAuthenticationService authenticationService,
            [NotNull] IOptions<SiteSettings> siteSettings, [NotNull] IUserQueries userQueries)
        {
            if (siteSettings == null)
            {
                throw new ArgumentNullException(nameof(siteSettings));
            }

            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._siteSettings = siteSettings.Value;
        }

        [BindProperty(SupportsGet = true)]
        public string ReturnUrl { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!this.ModelState.IsValid)
            {
                return string.IsNullOrEmpty(this.ReturnUrl)
                    ? this.RedirectToPage()
                    : this.RedirectToPage(new {this.ReturnUrl});
            }

            var result =
                await this._mediator.Send(new LoginCommand(this.PageModel.EmailAddress, this.PageModel.Password));
            if (result.IsSuccess)
            {
                if (result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.AuthDeviceEnabled) ||
                    result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.AuthAppEnabled) ||
                    this._siteSettings.MfaEnforced)
                {
                    await this._authenticationService.SignInPartial(result.Value.UserId, this.ReturnUrl,
                        result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.PasswordExpired));

                    if (result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.AuthDeviceEnabled))
                    {
                        return this.RedirectToPage(PageLocations.Auth_DeviceVerification);
                    }

                    if (result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.AuthAppEnabled))
                    {
                        return this.RedirectToPage(PageLocations.Auth_AppVerification);
                    }

                    return this.RedirectToPage(PageLocations.Auth_RemoteVerification);
                }

                if (result.Value.Status.HasFlag(LoginCommandResult.LoginResultStatus.PasswordExpired))
                {
                    await this._authenticationService.SignInPartial(result.Value.UserId, this.ReturnUrl, true);

                    return this.RedirectToPage(PageLocations.Auth_PasswordUpdate);
                }

                if (result.Value.Status == LoginCommandResult.LoginResultStatus.Valid)
                {
                    await this._authenticationService.SignIn(result.Value.UserId);
                    if (string.IsNullOrEmpty(this.ReturnUrl))
                    {
                        return this.RedirectToPage(PageLocations.App_Dashboard);
                    }

                    return this.LocalRedirect(this.ReturnUrl);
                }
            }

            this.AddPageNotification("Issue signing in.", "Sorry, there was a problem signing you in. Please try again");

            return string.IsNullOrEmpty(this.ReturnUrl)
                ? this.RedirectToPage()
                : this.RedirectToPage(new {this.ReturnUrl});
        }

        public class Model
        {
            public string EmailAddress { get; set; }

            public string Password { get; set; }
        }

        public class Validator : AbstractValidator<Model>
        {
            public Validator()
            {
                this.RuleFor(x => x.EmailAddress).NotEmpty().EmailAddress();
                this.RuleFor(x => x.Password).NotEmpty();
            }
        }
    }
}