using System;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.UpdateForm
{
    public class UpdateFormRequest: IRequest<AbstractAnswer<Form>>
    {
        public Guid Id { get; set; }
        public string Fields { get; set; }
    }
}