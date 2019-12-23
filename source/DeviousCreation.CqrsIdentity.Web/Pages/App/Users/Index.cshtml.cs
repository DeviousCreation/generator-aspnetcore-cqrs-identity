using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Pages.App.Users
{
    public class Index : PageModel
    {
        public int TotalNewUsers {get; private set;}
        public int TotalActiveUsers {get; private set;}
        public int TotalLogins {get; private set;}
        public int TotalLockedAccounts {get; private set;}
        [Authorize]
        public void OnGet()
        {
            this.TotalNewUsers = 2;
            this.TotalActiveUsers = 3;
            this.TotalLogins = 4;
            this.TotalLockedAccounts = 5;
        }
    }
}
