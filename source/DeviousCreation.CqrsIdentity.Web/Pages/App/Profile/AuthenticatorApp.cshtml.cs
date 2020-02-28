using System;
using System.DrawingCore.Imaging;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Pages.App.UserManagement.Users;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QRCoder;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.Profile
{
    [Authorize]
    public class AuthenticatorApp : PrgPageModel<AuthenticatorApp.Model>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDomainHelpers _domainHelpers;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;

        public AuthenticatorApp([NotNull] IMediator mediator, [NotNull] ICurrentUserService currentUserService,
            [NotNull] IUserQueries userQueries, [NotNull] IDomainHelpers domainHelpers)
        {
            this._currentUserService =
                currentUserService ?? throw new ArgumentNullException(nameof(currentUserService));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._domainHelpers = domainHelpers ?? throw new ArgumentNullException(nameof(domainHelpers));
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public string SharedKey { get; set; }

        public string AuthenticatorUri { get; set; }

        public string Code { get; set; }

        public bool IsSetup { get; set; }

        public async Task<IActionResult> OnGet()
        {
            var userCheck = await this._userQueries.CheckCurrentUserHasAuthApp();

            if (userCheck.IsPresent)
            {
                this.IsSetup = true;
            }
            else
            {
                if (this.PageModel == null)
                {
                    var result = await this._mediator.Send(new InitiatelAuthenticatorAppEnrollmentCommand());
                    if (result.IsFailure)
                    {
                        return this.NotFound();
                    }

                    this.PageModel = new Model
                    {
                        SharedKey = result.Value.SharedKey,
                    };
                }

                var currentUserMaybe = this._currentUserService.CurrentUser;
                if (currentUserMaybe.HasNoValue)
                {
                    return this.NotFound();
                }

                var currentUser = currentUserMaybe.Value;
                this.SharedKey = this._domainHelpers.FormatAuthenticatorAppKey(this.PageModel.SharedKey);
                this.AuthenticatorUri =
                    this._domainHelpers.GenerateAuthenticatorAppQrCodeUri(
                        currentUser.Username, this.PageModel.SharedKey);
                var qrGenerator = new QRCodeGenerator();

                var qrCodeData = qrGenerator.CreateQrCode(this.AuthenticatorUri, QRCodeGenerator.ECCLevel.Q);

                var qrCode = new QRCode(qrCodeData);
                var qrCodeImage = qrCode.GetGraphic(20);

                await using var stream = new MemoryStream();
                qrCodeImage.Save(stream, ImageFormat.Png);
                var bytes = stream.ToArray();
                this.Code = Convert.ToBase64String(bytes);
            }

            return this.Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if (!this.ModelState.IsValid)
            {
                return this.RedirectToPage();
            }

            var result =
                await this._mediator.Send(
                    new EnrollAuthenticatorAppCommand(this.PageModel.SharedKey, this.PageModel.Code));
            if (result.IsSuccess)
            {
                this.AddPageNotification("App Setup", "The app has been registered");
                this.PrgState = PrgState.Success;
            }
            else
            {
                this.PrgState = PrgState.Failed;
            }

            return this.RedirectToPage();
        }

        public async Task<IActionResult> OnPostRevokeAsync()
        {
            var result = await this._mediator.Send(new RevokeAuthenticatorAppCommand());
            if (result.IsSuccess)
            {
                this.PrgState = PrgState.Success;
                this.AddPageNotification("App Setup", "The app has been revoked");
            }
            else
            {
                this.PrgState = PrgState.Failed;
            }

            return this.RedirectToPage();
        }

        public class Model
        {
            public string Code { get; set; }

            public string SharedKey { get; set; }
        }
    }
}