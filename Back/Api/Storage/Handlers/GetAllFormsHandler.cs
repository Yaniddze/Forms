using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain;
using Api.Storage.DbEntities;
using Api.UseCases.Abstractions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.Form>>;

namespace Api.Storage.Handlers
{
    public class GetAllFormsHandler: GetAllForms
    {
        private readonly ApiContext context;
        private readonly IMapper mapper;

        public GetAllFormsHandler(ApiContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<AbstractAnswer<IEnumerable<Form>>> HandleAsync(int count, int offset)
        {
            try
            {
                var forms = await context.Forms
                    .Take(count)
                    .Skip(offset)
                    .Select(x => mapper.Map<FormDB, Form>(x))
                    .ToListAsync();

                return CreateSuccess(forms);
            }
            catch
            {
                return CreateFailed(new [] {"Database error"});
            }
        }
    }
}