using System;
using System.Linq;
using System.Threading.Tasks;
using Api.Storage.Abstractions;
using Api.UseCases.Abstractions;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Guid>;

namespace Api.Storage.Handlers
{
    public class DeleteFormHandler: DeleteForm
    {
        private readonly ApiContext context;

        public DeleteFormHandler(ApiContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<Guid>> HandleAsync(Guid id)
        {
            try
            {
                var deleted = await context.Forms
                    .Where(x => x.Id == id)
                    .DeleteAsync();

                if (deleted > 0)
                {
                    return CreateSuccess(id);
                } 
                
                return CreateFailed(new[] {"Id not found"});
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}