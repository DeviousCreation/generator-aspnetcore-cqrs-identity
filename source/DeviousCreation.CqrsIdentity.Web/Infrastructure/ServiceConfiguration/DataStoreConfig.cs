// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.Infrastructure;
using DeviousCreation.CqrsIdentity.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.ServiceConfiguration
{
    public static class DataStoreConfig
    {
        public static IServiceCollection AddDataStores(
            this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDistributedMemoryCache();
            services.AddEntityFrameworkSqlServer()
                .AddDbContext<DataContext>(options =>
                {
                    options.UseSqlServer(configuration["query:connectionString"]);
                })
            
                .AddDbContext<ODataContext>(options =>
                {
                    options.UseSqlServer(configuration["query:connectionString"]);
                });

            return services;
        }
    }
}