using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers
{
    public interface ServiceInstaller
    {
        void Install(IServiceCollection services, IConfiguration configuration);
    }
}