using System;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;

namespace Api.Storage.Abstractions
{
    public interface DeleteForm
    {
        Task<AbstractAnswer<Guid>> HandleAsync(Guid id);
    }
}