using Api.DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers.Services
{
    public class EfInstaller: ServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            var conn = configuration.GetConnectionString("Postgres");

            services.AddDbContextPool<ApiContext>(x =>
            {
                x.UseNpgsql(conn);
            });
        }
    }
}