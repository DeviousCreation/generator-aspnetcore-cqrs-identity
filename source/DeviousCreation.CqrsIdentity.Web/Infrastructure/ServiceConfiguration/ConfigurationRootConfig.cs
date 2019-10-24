// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Queries.ConnectionProviders;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.ServiceConfiguration
{
    public static class ConfigurationRootConfig
    {
        public static IServiceCollection AddConfigurationRoot(
            this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IDbConnectionProvider, SqlConnectionProvider>();
            return services;
        }
    }
}