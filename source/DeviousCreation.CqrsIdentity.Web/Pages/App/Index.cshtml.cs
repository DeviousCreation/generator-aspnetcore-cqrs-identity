using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App
{
    [Authorize]
    public class Index : PageModel
    {
        public void OnGet()
        {

        }
    }
}
