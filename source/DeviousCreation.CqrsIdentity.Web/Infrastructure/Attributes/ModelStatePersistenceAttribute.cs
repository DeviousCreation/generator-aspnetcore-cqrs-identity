using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Extensions;
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
}
