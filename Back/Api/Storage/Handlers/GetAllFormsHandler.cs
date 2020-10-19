using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.Storage.Abstractions;
using Api.UseCases.Abstractions;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.Form>>;

namespace Api.Storage.Handlers
{
    public class GetAllFormsHandler: GetAllForms
    {
        private readonly ApiContext context;

        public GetAllFormsHandler(ApiContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<IEnumerable<Form>>> HandleAsync()
        {
            return CreateFailed(new [] {"123"});
        }
    }
}