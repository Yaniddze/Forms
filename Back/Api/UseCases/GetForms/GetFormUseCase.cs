using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.Form>>;

namespace Api.UseCases.GetForms
{
    public class GetFormUseCase: IRequestHandler<GetFormsRequest, AbstractAnswer<IEnumerable<Form>>>
    {
        private readonly GetAllForms formGetter;

        public GetFormUseCase(GetAllForms formGetter)
        {
            this.formGetter = formGetter;
        }

        public async Task<AbstractAnswer<IEnumerable<Form>>> Handle(GetFormsRequest request, CancellationToken cancellationToken)
        {
            if (request.Count <= 0 || request.Offset < 0)
            {
                return CreateFailed(new [] {"Count and Offset must be positive"});            
            }

            return await formGetter.HandleAsync(request.Count, request.Offset);
        }
    }
}
