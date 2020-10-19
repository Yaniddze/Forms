using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.GetForms
{
    public class GetFormsRequest : IRequest<AbstractAnswer<IEnumerable<Form>>>
    {
        public int Count { get; set; }
        public int Offset { get; set; }
    }
}