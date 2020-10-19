using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DataBase;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.Form>>;

namespace Api.Infostructure.Handlers
{
    public class SearchQueryHandler: SearchQuery
    {
        private readonly ApiContext context;
        private readonly IMapper mapper;

        public SearchQueryHandler(IMapper mapper, ApiContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<AbstractAnswer<IEnumerable<Form>>> HandleAsync(string query, int count, int offset)
        {
            try
            {
                var founded = await context.Forms
                    .Where(x => x.Keywords.Contains(query))
                    .Take(count)
                    .Skip(offset)
                    .Select(x => mapper.Map<FormDB, Form>(x))
                    .ToListAsync();

                return CreateSuccess(founded);
            }
            catch
            {
                return CreateFailed(new [] {"Database error"});
            }
        }
    }
}