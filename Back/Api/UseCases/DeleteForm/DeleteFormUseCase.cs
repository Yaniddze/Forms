using System;
using System.Threading;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.DeleteForm
{
    public class DeleteFormUseCase: IRequestHandler<DeleteFormRequest, AbstractAnswer<Guid>>
    {
        private readonly Abstractions.DeleteForm formDeleter;

        public DeleteFormUseCase(Abstractions.DeleteForm formDeleter)
        {
            this.formDeleter = formDeleter;
        }

        public async Task<AbstractAnswer<Guid>> Handle(DeleteFormRequest request, CancellationToken cancellationToken)
        {
            return await formDeleter.HandleAsync(request.Id);
        }
    }
}