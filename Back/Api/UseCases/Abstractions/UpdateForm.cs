using System.Threading.Tasks;
using Api.Domain;

namespace Api.UseCases.Abstractions
{
    public interface UpdateForm
    {
        Task<AbstractAnswer<Form>> HandleAsync(Form form);
    }
}