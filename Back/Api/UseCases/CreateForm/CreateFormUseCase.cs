using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.CreateForm
{
    public class CreateFormUseCase: IRequestHandler<CreateFormRequest, AbstractAnswer<Guid>>
    {
        private readonly Abstractions.CreateForm formCreator;
        private readonly ConvertObject converter;

        public CreateFormUseCase(Abstractions.CreateForm formCreator, ConvertObject converter)
        {
            this.formCreator = formCreator;
            this.converter = converter;
        }

        public string[] GetKeywords(object objs)
        {
            var converted = converter.Convert(objs);
            
            var regex = new Regex(@"\w{1,}");

            var matches = regex.Matches(converted);
            
            return matches.Select(x => x.Value).ToArray();
        }

        public async Task<AbstractAnswer<Guid>> Handle(CreateFormRequest request, CancellationToken cancellationToken)
        {
            var keywords = GetKeywords(request.Fields);

            var created = await formCreator.HandleAsync(request.Fields, keywords);
            
            return created;
        }
    }
}