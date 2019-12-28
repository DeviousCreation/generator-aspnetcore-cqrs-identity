using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.Users
{
    public class Edit : PageModel
    {
        [Authorize]
        public void OnGet()
        {
        }
    }
}
