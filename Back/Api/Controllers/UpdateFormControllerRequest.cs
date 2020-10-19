using System;
using System.Text.Json;

namespace Api.Controllers
{
    public class UpdateFormControllerRequest
    {
        public Guid Id { get; set; }
        public JsonElement Fields { get; set; }
    }
}