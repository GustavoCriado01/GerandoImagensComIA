using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OpenAI;
using OpenAI.Images;

namespace GerandoImagensComIA.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImagesController : ControllerBase
    {
        private readonly OpenAIClient _client;
        private readonly OpenAIOptions _options;

        public ImagesController(OpenAIClient client, IOptions<OpenAIOptions> options)
        {
            _client = client;
            _options = options.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] GenerateImageRequest request)
        {
            var imageClient = _client.GetImageClient(_options.ImageModel);

            var result = await imageClient.GenerateImageAsync(
               request.Prompt,
               new OpenAI.Images.ImageGenerationOptions
               {
                   Size = GeneratedImageSize.W1024xH1024,
               }
            );
            return Ok(result.Value.ImageUri);
        }
    }
}