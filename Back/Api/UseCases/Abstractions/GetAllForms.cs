using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;

namespace Api.UseCases.Abstractions
{
    public interface GetAllForms
    {
        Task<AbstractAnswer<IEnumerable<Form>>> HandleAsync(int count, int offset);
    }
}