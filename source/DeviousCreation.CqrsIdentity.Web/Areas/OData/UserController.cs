using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.OData;
using DeviousCreation.CqrsIdentity.OData.Entities;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Mvc;

namespace DeviousCreation.CqrsIdentity.Web.Areas.OData
{
    [Area("OData")]
    public class UserController : ODataController
    {
        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All)]
        public IQueryable<User> Get([FromServices]ODataContext context)
            => context.Users;
    }

    [Area("OData")]
    public class RoleController : ODataController
    {
        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All)]
        public IQueryable<Role> Get([FromServices]ODataContext context)
            => context.Roles;
    }
}
