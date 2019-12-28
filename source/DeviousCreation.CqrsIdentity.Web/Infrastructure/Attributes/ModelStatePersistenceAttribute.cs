using System;
using System.Net;
using System.Security.Claims;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.Attributes
{
    public class ModelStatePersistenceAttribute : ResultFilterAttribute
    {
        protected const string Key = nameof(ModelStatePersistenceAttribute);

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            var pageModel = context.Controller as PageModel;
            if (!(context.Result is RedirectToPageResult))
            {
                if (pageModel?.TempData[Key] is string serializedModelState)
                {
                    if (context.Result is PageResult)
                    {
                        var modelState = serializedModelState.DeserializeModelState();
                        context.ModelState.Merge(modelState);
                    }
                    else
                    {
                        pageModel.TempData.Remove(Key);
                    }
                }
            }

            base.OnResultExecuting(context);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            var pageModel = context.Controller as PageModel;

            if (context.Result is RedirectToPageResult)
            {
                if (!context.ModelState.IsValid)
                {
                    if (pageModel != null && context.ModelState != null)
                    {
                        var modelState = context.ModelState.ToSerializedString();
                        pageModel.TempData[Key] = modelState;
                    }
                }
            }

            base.OnResultExecuted(context);
        }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class ResourceBasedAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        private readonly string _resource;

        public ResourceBasedAuthorizeAttribute(string resource)
        {
            this._resource = resource;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                return;
            }

            if (user.HasClaim(x => x.Type == CustomClaimTypes.IsAdmin))
            {
                return;
            }

            if (user.HasClaim(ClaimTypes.Role, this._resource))
            {
                return;
            }

            context.Result = new StatusCodeResult((int) HttpStatusCode.Forbidden);
        }
    }
}