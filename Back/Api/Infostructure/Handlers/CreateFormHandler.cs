using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DataBase;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using AutoMapper;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Guid>;

namespace Api.Infostructure.Handlers
{
    public class CreateFormHandler: CreateForm
    {
        private readonly ApiContext context;
        private readonly IMapper mapper;

        public CreateFormHandler(ApiContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<AbstractAnswer<Guid>> HandleAsync(IEnumerable<Field> fields, string[] keywords)
        {
            try
            {
                var formGuid = Guid.NewGuid();
                
                var mappedFields = fields
                    .Select(x =>
                    {
                        var mapped = mapper.Map<Field, FieldDB>(x);
                        mapped.Id = Guid.NewGuid();
                        mapped.FormId = formGuid;
                        return mapped;
                    });
                
                context.Forms.Add(new FormDB
                {
                    Id = formGuid,
                    Keywords = keywords,
                });

                context.Fields.AddRange(mappedFields);

                await context.SaveChangesAsync();
            
                return CreateSuccess(formGuid);
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}