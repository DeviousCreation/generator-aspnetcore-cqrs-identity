using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
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
