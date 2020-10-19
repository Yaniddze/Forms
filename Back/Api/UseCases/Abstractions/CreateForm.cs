using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;

namespace Api.UseCases.Abstractions
{
    public interface CreateForm
    {
        Task<AbstractAnswer<Guid>> HandleAsync(IEnumerable<Field> fields, string[] keywords);
    }
}