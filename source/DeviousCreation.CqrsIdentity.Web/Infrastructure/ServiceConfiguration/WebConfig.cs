// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Web.Pages.Auth;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.ServiceConfiguration
{
    public static class WebConfig
    {
        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services)
        {
            services
                .AddMvc()
                .AddRazorRuntimeCompilation()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddFluentValidation(fv =>
                {
                    fv.RegisterValidatorsFromAssemblyContaining<Register.Validator>();
                    fv.ImplicitlyValidateChildProperties = true;
                })
                .AddFeatureFolders()
                .AddAreaFeatureFolders()
                .AddNewtonsoftJson();

            services.AddControllers(mvc => { mvc.EnableEndpointRouting = false; });
            return services;
        }

        public static IApplicationBuilder AddCustomizedErrorResponse(
            this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseDatabaseErrorPage();
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            return app;
        }
    }
}