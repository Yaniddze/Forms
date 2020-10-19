using System;
using System.Threading.Tasks;

namespace Api.UseCases.Abstractions
{
    public interface DeleteForm
    {
        Task<AbstractAnswer<Guid>> HandleAsync(Guid id);
    }
}