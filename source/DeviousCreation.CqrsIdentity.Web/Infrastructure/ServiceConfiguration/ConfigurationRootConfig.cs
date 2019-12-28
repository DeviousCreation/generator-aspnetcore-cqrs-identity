// TOKEN_COPYRIGHT_TEXT

using System;
using System.Reflection;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Core.Domain;
using DeviousCreation.CqrsIdentity.Core.Settings;
using DeviousCreation.CqrsIdentity.Domain;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandHandlers.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.Commands.UserAggregate;
using DeviousCreation.CqrsIdentity.Domain.CommandValidators.UserAggregate;
using DeviousCreation.CqrsIdentity.Infrastructure.Repositories;
using DeviousCreation.CqrsIdentity.Queries;
using DeviousCreation.CqrsIdentity.Queries.ConnectionProviders;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Services;
using Fido2NetLib;
using FluentValidation;
using MediatR;
using MediatR.Extensions.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NodaTime;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.ServiceConfiguration
{
    public static class ConfigurationRootConfig
    {
        public static IServiceCollection AddConfigurationRoot(
            this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IPasswordHasher, PasswordHasher>();
            services.AddSingleton<IPasswordGenerator, PasswordGenerator>();
            services.AddSingleton<IPasswordValidator, PasswordValidator>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IDbConnectionProvider, SqlConnectionProvider>();
            services.AddScoped<IUserQueries, UserQueries>();
            services.AddScoped<IRoleQueries, RoleQueries>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddSingleton<IClock>(SystemClock.Instance);
            services.AddSingleton<IFido2>(ImplementationFactory);
            services.AddScoped<IDomainHelpers, DomainHelpers>();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidatorBehavior<,>));

           
            
            return services;
        }

        private static Fido2 ImplementationFactory(IServiceProvider arg)
        {
            var options = arg.GetService<IOptions<FidoSettings>>();
            
            return new Fido2(new Fido2Configuration()
            {
                ServerDomain = options.Value.ServerDomain, //["fido2:serverDomain"],
                ServerName = "Fido2 test",
                Origin = options.Value.Origin,
                // Only create and use Metadataservice if we have an acesskey
                
            });
        }
    }

    public static class AuthenticationConfig
    {
        public static IServiceCollection AddCustomizedAuthentication(this IServiceCollection services,
            IConfigurationRoot configuration)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => { options.LoginPath = "/sign-in"; })
                .AddCookie("login-partial");

            //services.AddFido2(options =>
            //{
            //    options.ServerDomain = configuration["fido2:serverDomain"];
            //    options.ServerName = "FIDO2 Test";
            //    options.Origin = configuration["fido2:origin"];
            //    options.TimestampDriftTolerance = configuration.GetValue<int>("fido2:timestampDriftTolerance");
            //    options.MDSAccessKey = configuration["fido2:MDSAccessKey"];
            //    options.MDSCacheDirPath = configuration["fido2:MDSCacheDirPath"];
            //})
                //.AddCachedMetadataService(config =>
                //{
                //    //They'll be used in a "first match wins" way in the order registered
                //    config.AddStaticMetadataRepository();
                //    if (!string.IsNullOrWhiteSpace(configuration["fido2:MDSAccessKey"]))
                //    {
                //        config.AddFidoMetadataRepository(configuration["fido2:MDSAccessKey"]);
                //    }
                //})
                ;

            return services;
        }
    }

    public static class SettingConfig
    {
        public static IServiceCollection AddSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<QuerySettings>(configuration.GetSection("query"));
            services.Configure<IdentitySettings>(configuration.GetSection("identity"));
            services.Configure<SiteSettings>(configuration.GetSection("site"));
            services.Configure<FidoSettings>(configuration.GetSection("fido2"));

            return services;
        }
    }
}