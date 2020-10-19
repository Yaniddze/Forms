using System;
using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.CreateForm
{
    public class CreateFormRequest: IRequest<AbstractAnswer<Guid>>
    {
        public string Fields { get; set; }
    }
}