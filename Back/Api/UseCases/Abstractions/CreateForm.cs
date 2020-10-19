using System;
using System.Threading.Tasks;

namespace Api.UseCases.Abstractions
{
    public interface CreateForm
    {
        Task<AbstractAnswer<Guid>> HandleAsync(string fields, string[] keywords);
    }
}