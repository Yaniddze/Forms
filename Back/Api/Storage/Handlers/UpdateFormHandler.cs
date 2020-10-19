using System.Linq;
using System.Threading.Tasks;
using Api.Domain;
using Api.Storage.DbEntities;
using Api.UseCases.Abstractions;
using AutoMapper;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer<Api.Domain.Form>;

namespace Api.Storage.Handlers
{
    public class UpdateFormHandler: UpdateForm
    {
        private readonly ApiContext context;
        private readonly IMapper mapper;

        public UpdateFormHandler(ApiContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<AbstractAnswer<Form>> HandleAsync(Form form)
        {
            try
            {
                var mappedForm = mapper.Map<Form, FormDB>(form);

                await context.Fields
                    .Where(x => x.FormId == mappedForm.Id)
                    .DeleteAsync();

                var updated = await context.Forms
                    .Where(x => x.Id == mappedForm.Id)
                    .UpdateAsync(x => new FormDB
                    {
                        Fields = mappedForm.Fields,
                        Keywords = mappedForm.Keywords,
                    });

                if (updated > 0)
                {
                    return CreateSuccess(form);
                }

                return CreateFailed(new[] {"Bad form id"});
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}