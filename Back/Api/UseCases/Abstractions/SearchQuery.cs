using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;

namespace Api.UseCases.Abstractions
{
    public interface SearchQuery
    {
        Task<AbstractAnswer<IEnumerable<Form>>> HandleAsync(string query);
    }
}