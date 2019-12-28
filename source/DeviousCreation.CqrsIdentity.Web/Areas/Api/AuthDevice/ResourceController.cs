using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Queries.Models.Role;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Areas.Api.AuthDevice
{
    public class ResourceController : Controller
    {
        private readonly IRoleQueries _roleQueries;

        public ResourceController(IRoleQueries roleQueries)
        {
            this._roleQueries = roleQueries;
        }

        [HttpGet("api/resources/list-for-current-user")]
        public async Task<IActionResult> GetAvailableResourcesForCurrentUser()
        {
            var maybe = await this._roleQueries.GetNestedSimpleResources(CancellationToken.None);
            if (maybe.HasNoValue)
            {
                return Json(new List<SimpleResource>());
            }

            return Json(maybe.Value.Entities);
        }
    }
}
