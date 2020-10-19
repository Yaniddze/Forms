using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.Storage.Queries
{
    public class GetAllFormsQuery: IRequest<AbstractAnswer<IEnumerable<Form>>>
    { }
}