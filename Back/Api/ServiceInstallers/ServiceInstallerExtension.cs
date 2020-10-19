using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers
{
    public static class ServiceInstallerExtension
    {
        public static void InstallFromAssembly(this IServiceCollection services, IConfiguration configuration)
        {
            typeof(Startup).Assembly.ExportedTypes
                .Where(
                    x => typeof(ServiceInstaller).IsAssignableFrom(x)
                    && x.IsClass && !x.IsAbstract && !x.IsInterface
                )
                .Select(Activator.CreateInstance)
                .Cast<ServiceInstaller>()
                .ToList()
                .ForEach(service => service.Install(services, configuration));
        }
    }
}