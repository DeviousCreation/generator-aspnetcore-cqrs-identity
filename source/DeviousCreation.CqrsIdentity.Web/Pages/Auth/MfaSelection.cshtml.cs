using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [Authorize(AuthenticationSchemes = "login-partial")]
    public class MfaSelection : PageModel
    {
        private readonly IUserQueries _userQueries;

        public MfaSelection([NotNull] IUserQueries userQueries)
        {
            this._userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
        }

        public bool HasAuthDevice { get; set; }

        public bool HasAuthApp { get; set; }

        public bool HasMobile { get; set; }

        public async Task OnGetAsync()
        {
            var result = await this._userQueries.GetMfaMethodStatusForCurrentUser(CancellationToken.None);

            this.HasMobile = result.HasMobile;
            this.HasAuthApp = result.HasAuthApp;
            this.HasAuthDevice = result.HasAuthDevice;
        }
    }
}