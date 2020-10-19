using System;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;

namespace Api.Storage.Abstractions
{
    public interface CreateForm
    {
        Task<AbstractAnswer<Guid>> HandleAsync();
    }
}