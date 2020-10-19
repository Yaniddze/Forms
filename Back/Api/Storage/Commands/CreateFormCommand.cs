using System;
using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.Storage.Commands
{
    public class CreateFormCommand: IRequest<AbstractAnswer<Guid>>
    {
        public IEnumerable<Field> Fields { get; set; }
    }
}