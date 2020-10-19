using System;
using System.Linq;
using AutoMapper;

namespace Api.Mappers.Abstractions
{
    public static class MapperExtension
    {
        public static void InstallFromAssembly(this IMapperConfigurationExpression options)
        {
            typeof(Startup).Assembly.ExportedTypes
                .Where(x => typeof(MapperInstaller).IsAssignableFrom(x)
                    && x.IsClass && !x.IsInterface && !x.IsAbstract
                )
                .Select(Activator.CreateInstance)
                .Cast<MapperInstaller>()
                .ToList()
                .ForEach(mapper => mapper.Install(options));
        }
    }
}