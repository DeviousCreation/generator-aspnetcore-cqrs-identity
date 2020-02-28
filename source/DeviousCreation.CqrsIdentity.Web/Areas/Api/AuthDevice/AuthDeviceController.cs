using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using Fido2NetLib;
using Fido2NetLib.Objects;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Areas.Api.AuthDevice
{
    [Area("Api")]
    public class AuthDeviceController : Controller
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IFido2 _fido2;
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;
        private readonly IAuthenticationService _authenticationService;

        public AuthDeviceController([NotNull] IMediator mediator, [NotNull] IUserQueries userQueries, IFido2 fido2,
            ICurrentUserService currentUserService, IAuthenticationService authenticationService)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
            this._fido2 = fido2;
            this._currentUserService = currentUserService;
            this._authenticationService = authenticationService;
        }

        [HttpPost("api/auth-device/initiate-registration")]
        public async Task<IActionResult> InitialAuthDeviceRegistration()
        {
            var currentUserMaybe = this._currentUserService.CurrentUser;
            if (currentUserMaybe.HasNoValue)
            {
                return this.Json(new CredentialCreateOptions {Status = "error"});
            }

            try
            {
                var fidoUser = new Fido2User
                {
                    Name = currentUserMaybe.Value.Username,
                    DisplayName = currentUserMaybe.Value.Username,
                    Id = currentUserMaybe.Value.UserId.ToByteArray(),
                };

                var publicKeyCredentialDescriptors = new List<PublicKeyCredentialDescriptor>();
                var data = await this._userQueries.GetDeviceInfoForCurrentUser(CancellationToken.None);
                if (data.HasValue)
                {
                    publicKeyCredentialDescriptors =
                        data.Value.Entities.Select(x => new PublicKeyCredentialDescriptor(x.CredentialId)).ToList();
                }

                var authenticatorSelection = new AuthenticatorSelection
                {
                    RequireResidentKey = false,
                    UserVerification = UserVerificationRequirement.Preferred,
                    AuthenticatorAttachment = AuthenticatorAttachment.CrossPlatform,
                };

                var authenticationExtensionsClientInputs = new AuthenticationExtensionsClientInputs
                {
                    Extensions = true,
                    UserVerificationIndex = true,
                    Location = true,
                    UserVerificationMethod = true,
                    BiometricAuthenticatorPerformanceBounds = new AuthenticatorBiometricPerfBounds
                    {
                        FAR = float.MaxValue,
                        FRR = float.MaxValue,
                    },
                };

                var options = this._fido2.RequestNewCredential(fidoUser, publicKeyCredentialDescriptors,
                    authenticatorSelection, AttestationConveyancePreference.None, authenticationExtensionsClientInputs);

                this.TempData["CredentialData"] = options.ToJson();
                return this.Json(options);
            }
            catch (Fido2VerificationException e)
            {
                return this.Json(new CredentialCreateOptions
                    {Status = "error", ErrorMessage = this.FormatException(e)});
            }
        }

        [HttpPost("api/auth-device/complete-registration")]
        public async Task<IActionResult> CompleteAuthDeviceRegistration(
            [FromBody] CompleteAuthDeviceRegistrationRequest model)
        {
            var jsonOptions = this.TempData["CredentialData"] as string;
            var options = CredentialCreateOptions.FromJson(jsonOptions);

            var result = await this._mediator.Send(new EnrollDeviceCommand(
                model.Name,
                model.AttestationResponse,
                options));

            if (result.IsFailure)
            {
                return this.Json(new Fido2.CredentialMakeResult {Status = "error"});
            }


            return this.Json(result.Value.CredentialMakeResult);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "login-partial")]
        [Route("api/auth-device/assertion-options")]
        public async Task<ActionResult> AssertionOptionsPost()
        {
            var data = await this._userQueries.GetDeviceInfoForCurrentUser(CancellationToken.None);
            var existingCredentials =
                data.Value.Entities.Select(x => new PublicKeyCredentialDescriptor(x.CredentialId));
            try
            {
                var exts = new AuthenticationExtensionsClientInputs
                {
                    SimpleTransactionAuthorization = "FIDO",
                    GenericTransactionAuthorization = new TxAuthGenericArg
                    {
                        ContentType = "text/plain",
                        Content = new byte[] {0x46, 0x49, 0x44, 0x4F}
                    },
                    UserVerificationIndex = true,
                    Location = true,
                    UserVerificationMethod = true
                };

                // 3. Create options
                var uv = UserVerificationRequirement.Discouraged;
                var options = this._fido2.GetAssertionOptions(
                    existingCredentials,
                    uv,
                    exts);

                // 4. Temporarily store options, session/in-memory cache/redis/db
                this.TempData["fido2.assertionOptions"] = options.ToJson();

                // 5. Return options to client
                return this.Json(options);
            }

            catch (Fido2VerificationException e)
            {
                return this.Json(new AssertionOptions {Status = "error"});
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "login-partial")]
        [Route("api/auth-device/make-assertion")]
        public async Task<JsonResult> MakeAssertion([FromBody] AuthenticatorAssertionRawResponse clientResponse)
        {
            
                // 1. Get the assertion options we sent the client
                var jsonOptions = this.TempData["fido2.assertionOptions"] as string;
                var options = AssertionOptions.FromJson(jsonOptions);

                var result = await this._mediator.Send(new ValidateAuthenticatorDeviceCommand(clientResponse, options));

                if (result.IsSuccess)
                {
                    await this._authenticationService.SignInFromPartial();
                return this.Json(result.Value.AssertionVerificationResult);
                }

                return this.Json(new AssertionVerificationResult { Status = "error" });
            
        }


        private string FormatException(Exception e)
        {
            return $"{e.Message}{(e.InnerException != null ? " (" + e.InnerException.Message + ")" : string.Empty)}";
        }
    }

    public class InitialAuthDeviceRegistrationRequest
    {
        public string Name { get; set; }
    }

    public class CompleteAuthDeviceRegistrationRequest
    {
        public AuthenticatorAttestationRawResponse AttestationResponse { get; set; }

        public string Name { get; set; }
    }

    
}