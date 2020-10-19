using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain;
using Api.Storage.Abstractions;
using Api.Storage.DbEntities;
using Api.UseCases.Abstractions;
using AutoMapper;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Guid>;

namespace Api.Storage.Handlers
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
                var mappedFields = fields.Select(x => mapper.Map<Field, FieldDB>(x));
                var tempGuid = Guid.NewGuid();

                context.Forms.Add(new FormDB
                {
                    Id = tempGuid,
                    Fields = mappedFields,
                    Keywords = keywords,
                });

                await context.SaveChangesAsync();
            
                return CreateSuccess(tempGuid);
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}