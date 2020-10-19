using System.Threading.Tasks;
using Api.UseCases.CreateForm;
using Api.UseCases.DeleteForm;
using Api.UseCases.GetForms;
using Api.UseCases.Search;
using Api.UseCases.UpdateForm;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("/api/v1")]
    public class FormsController: Controller
    {
        private readonly IMediator mediator;

        public FormsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetFormAsync([FromQuery] GetFormsRequest request)
        {
            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpPut("create")]
        public async Task<IActionResult> CreateFormAsync([FromBody] CreateFormRequest request)
        {
            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpPatch("update")]
        public async Task<IActionResult> UpdateFormAsync([FromBody] UpdateFormRequest request)
        {
            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteFormAsync([FromQuery] DeleteFormRequest request)
        {
            var response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync([FromBody] SearchRequest request)
        {
            var response = await mediator.Send(request);

            return Ok(response);
        }
    }
}