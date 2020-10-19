using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.UpdateForm
{
    public class UpdateFormUseCase: IRequestHandler<UpdateFormRequest, AbstractAnswer<Form>>
    {
        private readonly Abstractions.UpdateForm formUpdater;
        private readonly GetObjectKeys keysGetter;
        
        public UpdateFormUseCase(Abstractions.UpdateForm formUpdater, GetObjectKeys keysGetter)
        {
            this.formUpdater = formUpdater;
            this.keysGetter = keysGetter;
        }

        public async Task<AbstractAnswer<Form>> Handle(UpdateFormRequest request, CancellationToken cancellationToken)
        {
            var keywords = keysGetter.Handle(request.Fields);

            return await formUpdater.HandleAsync(new Form
            {
                Fields = request.Fields,
                Id = request.Id,
                Keywords = keywords,
            });
        }
    }
}