using Api.Mappers.Abstractions;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers.Services
{
    public class MapperServiceInstaller: ServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(x =>
            {
                x.InstallFromAssembly();
            });
        }
    }
}