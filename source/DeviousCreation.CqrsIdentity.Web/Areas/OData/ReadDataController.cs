using System;
using System.Linq;
using DeviousCreation.CqrsIdentity.OData;
using DeviousCreation.CqrsIdentity.OData.Entities;
using JetBrains.Annotations;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Areas.OData
{
    [Area("OData")]
    [Authorize]
    public class ReadDataController : ODataController
    {
        private readonly ODataContext _context;

        public ReadDataController([NotNull] ODataContext context)
        {
            this._context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [ODataRoute("odata/user")]
        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All)]
        public IQueryable<User> GetUsers()
        {
            return this._context.Users;
        }

        [ODataRoute("odata/role")]
        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All)]
        public IQueryable<Role> GetRoles()
        {
            return this._context.Roles;
        }
    }
}