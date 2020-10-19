using Api.Storage.Abstractions;
using Api.Storage.Handlers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers.Services
{
    public class DependenciesInstaller: ServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<GetAllForms, GetAllFormsHandler>();
            services.AddScoped<UpdateForm, UpdateFormHandler>();
            services.AddScoped<DeleteForm, DeleteFormHandler>();
            services.AddScoped<CreateForm, CreateFormHandler>();
            services.AddScoped<SearchQuery, SearchQueryHandler>();
        }
    }
}