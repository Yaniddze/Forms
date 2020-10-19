using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;

namespace Api.Storage.Abstractions
{
    public interface SearchQuery
    {
        Task<AbstractAnswer<IEnumerable<Form>>> HandleAsync(string query);
    }
}