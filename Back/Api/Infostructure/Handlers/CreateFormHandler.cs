using System;
using System.Threading.Tasks;
using Api.DataBase;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Guid>;

namespace Api.Infostructure.Handlers
{
    public class CreateFormHandler: CreateForm
    {
        private readonly ApiContext context;

        public CreateFormHandler(ApiContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<Guid>> HandleAsync(string fields, string[] keywords)
        {
            try
            {
                var formGuid = Guid.NewGuid();
                
                context.Forms.Add(new FormDB
                {
                    Id = formGuid,
                    Fields = fields,
                    Keywords = keywords,
                });

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