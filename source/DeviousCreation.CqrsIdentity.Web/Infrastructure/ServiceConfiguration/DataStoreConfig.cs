using DeviousCreation.CqrsIdentity.Infrastructure;
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
            services.AddEntityFrameworkSqlServer()
                .AddDbContext<DataContext>(options =>
                {
                    options.UseSqlServer(configuration["ConnectionString"]);
                });

            return services;
        }
    }
}