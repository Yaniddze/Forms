using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.DeleteForm
{
    public class DeleteFormRequest: IRequest<AbstractAnswer<Guid>>
    {
        public Guid Id { get; set; }
    }
}