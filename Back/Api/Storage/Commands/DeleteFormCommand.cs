using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.Storage.Commands
{
    public class DeleteFormCommand: IRequest<AbstractAnswer>
    {
        public Guid FormId { get; set; }
    }
}