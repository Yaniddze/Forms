using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.Storage.Commands
{
    public class UpdateFormCommand: IRequest<AbstractAnswer<Form>>
    {
        public IEnumerable<Field> Fields { get; set; }
    }
}