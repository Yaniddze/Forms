using Api.UseCases.Abstractions;
using Newtonsoft.Json;

namespace Api.Infostructure.Handlers
{
    public class ConvertObjectHandler: ConvertObject
    {
        public string Convert(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}