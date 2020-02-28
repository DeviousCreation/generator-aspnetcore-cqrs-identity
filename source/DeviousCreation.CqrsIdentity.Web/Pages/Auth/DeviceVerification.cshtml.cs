using System;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [Authorize(AuthenticationSchemes = "login-partial")]
    public class DeviceVerification : PageModel
    {
        private readonly IUserQueries _userQueries;

        public DeviceVerification([NotNull] IUserQueries userQueries)
        {
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
    }
}