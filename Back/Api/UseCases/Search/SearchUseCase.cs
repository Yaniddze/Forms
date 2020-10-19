using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Search
{
    public class SearchUseCase: IRequestHandler<SearchRequest, AbstractAnswer<IEnumerable<Form>>>
    {
        private readonly SearchQuery searcher;

        public SearchUseCase(SearchQuery searcher)
        {
            this.searcher = searcher;
        }

        public async Task<AbstractAnswer<IEnumerable<Form>>> Handle(SearchRequest request, CancellationToken cancellationToken)
        {
            return await searcher.HandleAsync(request.Query, request.Count, request.Offset);
        }
    }
}