// TOKEN_COPYRIGHT_TEXT

using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Features.UserManagement.Users
{
    public class UsersController : Controller
    {
        public IActionResult Users()
        {
            return this.View();
        }
    }
}