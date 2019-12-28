// TOKEN_COPYRIGHT_TEXT

using System.Reflection;
using DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate;
using DeviousCreation.CqrsIdentity.OData.Entities;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.ServiceConfiguration;
using JetBrains.Annotations;
using MediatR;
using MediatR.Extensions.FluentValidation.AspNetCore;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData.Edm;

namespace DeviousCreation.CqrsIdentity.Web
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            //services
            //    .AddRazorPages().AddRazorPagesOptions(options =>
            //    {
            //        options.Conventions.AuthorizeFolder("/Dashboard");
            //    });
            var ass = typeof(LoginCommandHandler).GetTypeInfo().Assembly;
            services.AddOData();
            services
                
                .AddConfigurationRoot()
                .AddDataStores(Configuration).
                AddSettings(this.Configuration)
                .AddCustomizedMvc()
                .AddCustomizedAuthentication(this.Configuration)
                .AddMediatR(ass)
                .AddFluentValidation(new[] { ass })
                ;
            



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app
                
                .AddCustomizedErrorResponse(env)
                .UseStaticFiles()
                .UseStackify(env)
                .UseRouting()
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapRazorPages();
                    endpoints.MapControllerRoute(name: "areaRoute", pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                    //endpoints.
                    
                });

            app.UseMvc(routeBuilder =>
            {
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
                routeBuilder.Select().Expand().Filter().OrderBy().MaxTop(1000).Count();
                routeBuilder.EnableDependencyInjection();
            });
        }

        private static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<User>("User");
            builder.EntitySet<Role>("Role");
            return builder.GetEdmModel();
        }

    }
}