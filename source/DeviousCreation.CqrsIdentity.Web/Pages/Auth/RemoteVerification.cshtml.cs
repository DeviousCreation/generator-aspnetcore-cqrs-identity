using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Constants;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [Authorize(AuthenticationSchemes = "login-partial")]
    public class RemoteVerification : PrgPageModel<RemoteVerification.Model>
    {
        private readonly IMediator _mediator;
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserQueries _userQueries;

        public RemoteVerification([NotNull] IMediator mediator, [NotNull] IAuthenticationService authenticationService,
            [NotNull] IUserQueries userQueries)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
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

            var result = await this._mediator.Send(new ValidateRemoteMultiFactorAuthCodeCommand(this.PageModel.Code));
            if (result.IsSuccess)
            {
                await this._authenticationService.SignInFromPartial();
                return this.RedirectToPage("/App/Index");
            }

            this.PrgState = PrgState.Failed;
            return this.RedirectToPage();
        }

        public async Task<IActionResult> OnPostSendEmailAsync()
        {
            await this._mediator.Send(new GenerateRemoteMultiFactorAuthCodeCommand(RemoteMfaType.Email));
            return this.RedirectToPage(PageLocations.Auth_RemoteVerification);
        }

        public class Model
        {
            public string Code { get; set; }
        }
    }
}
