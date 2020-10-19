using System.Linq;
using System.Text.RegularExpressions;
using Api.UseCases.Abstractions;
using Newtonsoft.Json;

namespace Api.Infostructure.Handlers
{
    public class GetObjectsKeysHandler: GetObjectKeys
    {
        public string[] Handle(object obj)
        {
            var converted = JsonConvert.SerializeObject(obj);
            
            var regex = new Regex(@"\w{1,}");

            var matches = regex.Matches(converted);
            
            var result = matches.Select(x => x.Value).ToArray();
            
            return result;
        }
    }
}