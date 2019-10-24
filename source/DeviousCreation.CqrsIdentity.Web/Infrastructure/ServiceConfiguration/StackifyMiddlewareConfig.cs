﻿// TOKEN_COPYRIGHT_TEXT

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.ServiceConfiguration
{
    public static class StackifyMiddlewareConfig
    {
        public static IApplicationBuilder UseStackify(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseMiddleware<StackifyMiddleware.RequestTracerMiddleware>();
            }

            return app;
        }
    }
}