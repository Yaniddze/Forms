using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;
using Microsoft.EntityFrameworkCore.Internal;

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
            var keywords = keysGetter.Handle(request.Fields).ToList();

            keywords.Remove(nameof(Field.Name));
            keywords.Remove(nameof(Field.Value));
            
            var created = await formCreator.HandleAsync(request.Fields, keywords.ToArray());
            
            return created;
        }
    }
}