using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Features.Home
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return this.View();
        }
    }
}