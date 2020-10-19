using AutoMapper;

namespace Api.Mappers.Abstractions
{
    public interface MapperInstaller
    {
        void Install(IMapperConfigurationExpression options);
    }
}