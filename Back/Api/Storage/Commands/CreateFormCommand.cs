using System;
using System.Collections.Generic;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.Storage.Commands
{
    public class CreateFormCommand: IRequest<AbstractAnswer<Guid>>
    {
        public IEnumerable<object> Fields { get; set; }
    }
}