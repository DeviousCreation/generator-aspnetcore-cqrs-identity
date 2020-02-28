using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [Authorize(AuthenticationSchemes = "login-partial")]
    public class AppVerification : PrgPageModel<AppVerification.Model>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;

        public AppVerification(
            [NotNull] IMediator mediator,
            [NotNull] IAuthenticationService authenticationService,
            [NotNull] IUserQueries userQueries)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._authenticationService =
                authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
        }

        public bool HasAuthDevice { get; set; }

        public bool HasAuthApp { get; set; }

        public bool HasMobile { get; set; }

        public async Task OnGet()
        {
            var result = await this._userQueries.GetMfaMethodStatusForCurrentUser();

            this.HasMobile = result.HasMobile;
            this.HasAuthApp = result.HasAuthApp;
            this.HasAuthDevice = result.HasAuthDevice;
        }

        public async Task<IActionResult> OnPost()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result = await this._mediator.Send(new ValidateAuthenticatorAppCommand(this.PageModel.Code));
            if (result.IsSuccess)
            {
                await this._authenticationService.SignInFromPartial();
                return this.RedirectToPage(PageLocations.App_Dashboard);
            }

            this.PrgState = PrgState.Failed;
            this.AddPageNotification("Authentication Issue", "There was an issue authenticating you with the app. Please try again.");
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