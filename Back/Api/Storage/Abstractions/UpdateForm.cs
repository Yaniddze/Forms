using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;

namespace Api.Storage.Abstractions
{
    public interface UpdateForm
    {
        Task<AbstractAnswer<Form>> HandleAsync();
    }
}