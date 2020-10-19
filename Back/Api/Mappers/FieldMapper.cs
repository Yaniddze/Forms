using Api.DataBase.DbEntities;
using Api.Domain;
using Api.Mappers.Abstractions;
using AutoMapper;

namespace Api.Mappers
{
    public class FieldMapper: MapperInstaller
    {
        public void Install(IMapperConfigurationExpression options)
        {
            options.CreateMap<Field, FieldDB>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Name,
                    map => map.MapFrom(
                        dest => dest.Name
                    ))
                .ForMember(x => x.Value,
                    map => map.MapFrom(
                        dest => dest.Value
                    ));
            
            options.CreateMap<FieldDB, Field>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Name,
                    map => map.MapFrom(
                        dest => dest.Name
                    ))
                .ForMember(x => x.Value,
                    map => map.MapFrom(
                        dest => dest.Value
                    ));
        }
    }
}