using System;
using System.Threading;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.CreateForm
{
    public class CreateFormUseCase: IRequestHandler<CreateFormRequest, AbstractAnswer<Guid>>
    {
        private readonly Abstractions.CreateForm formCreator;
        private readonly GetObjectKeys keysGetter;
        
        public CreateFormUseCase(Abstractions.CreateForm formCreator, GetObjectKeys keysGetter)
        {
            this.formCreator = formCreator;
            this.keysGetter = keysGetter;
        }

        public async Task<AbstractAnswer<Guid>> Handle(CreateFormRequest request, CancellationToken cancellationToken)
        {
            var keywords = keysGetter.Handle(request.Fields);
            
            var created = await formCreator.HandleAsync(request.Fields.ToString(), keywords);
            
            return created;
        }
    }
}