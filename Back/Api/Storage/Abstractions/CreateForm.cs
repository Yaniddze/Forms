using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;

namespace Api.Storage.Abstractions
{
    public interface CreateForm
    {
        Task<AbstractAnswer<Guid>> HandleAsync(IEnumerable<Field> fields, string[] keywords);
    }
}