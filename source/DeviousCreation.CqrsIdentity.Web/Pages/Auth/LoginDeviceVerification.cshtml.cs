using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.Auth
{
    [Authorize(AuthenticationSchemes = "login-partial")]
    public class LoginDeviceVerificationModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
