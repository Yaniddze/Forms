using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Search
{
    public class SearchRequest: IRequest<AbstractAnswer<IEnumerable<Form>>>
    {
        public string Query { get; set; }
        public int Count { get; set; }
        public int Offset { get; set; }
    }
}