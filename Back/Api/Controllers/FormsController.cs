using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Api.UseCases.CreateForm;
using Api.UseCases.DeleteForm;
using Api.UseCases.GetForms;
using Api.UseCases.Search;
using Api.UseCases.UpdateForm;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

using static Api.UseCases.Abstractions.AbstractAnswer;

namespace Api.Controllers
{
    [Route("/api/v1")]
    public class FormsController : Controller
    {
        private readonly IMediator mediator;

        public FormsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetFormAsync([FromQuery] GetFormsRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Ok(CreateFailed(GetModelStateErrors().ToArray()));
            }
            
            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpPut("create")]
        public async Task<IActionResult> CreateFormAsync([FromBody] JsonElement fields)
        {
            if (!ModelState.IsValid)
            {
                return Ok(CreateFailed(GetModelStateErrors()));
            }

            var stringFields = fields.ToString();
            if (String.IsNullOrEmpty(stringFields) || stringFields.Equals("{}"))
            {
                return Ok(CreateFailed(new[] {"Body must contain something"}));
            }

            var response = await mediator.Send(new CreateFormRequest
            {
                Fields = fields.ToString()
            });

            return Ok(response);
        }

        [HttpPatch("update")]
        public async Task<IActionResult> UpdateFormAsync([FromBody] UpdateFormControllerRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Ok(CreateFailed(GetModelStateErrors()));
            }

            var stringFields = request.Fields.ToString();
            if (String.IsNullOrEmpty(stringFields) || stringFields.Equals("{}"))
            {
                return Ok(CreateFailed(new[] {"'fields' must contain something"}));
            }

            var response = await mediator.Send(new UpdateFormRequest
            {
                Id = request.Id,
                Fields = request.Fields.ToString(),
            });

            return Ok(response);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteFormAsync([FromQuery] DeleteFormRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Ok(CreateFailed(GetModelStateErrors()));
            }
            
            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync([FromBody] SearchRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Ok(CreateFailed(GetModelStateErrors()));
            }
            
            var response = await mediator.Send(request);

            return Ok(response);
        }
        
        private string[] GetModelStateErrors() => ModelState.Values.Select(x =>
            Strings.Join(x.Errors.Select(error => error.ErrorMessage).ToArray())).ToArray();
    }
}