using Api.DataBase.DbEntities;
using Api.Domain;
using Api.Mappers.Abstractions;
using AutoMapper;

namespace Api.Mappers
{
    public class FormMapper: MapperInstaller
    {
        public void Install(IMapperConfigurationExpression options)
        {
            options.CreateMap<Form, FormDB>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Fields,
                    map => map.MapFrom(
                        dest => dest.Fields
                    ))
                .ForMember(x => x.Keywords,
                    map => map.MapFrom(
                        dest => dest.Keywords
                    ));
            
            options.CreateMap<FormDB, Form>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Fields,
                    map => map.MapFrom(
                        dest => dest.Fields
                    ))
                .ForMember(x => x.Keywords,
                    map => map.MapFrom(
                        dest => dest.Keywords
                    ));
        }
    }
}