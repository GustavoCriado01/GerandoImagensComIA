using Microsoft.AspNetCore.Mvc;

namespace GerandoImagensComIA.Controllers
{
    public sealed class OpenAIOptions
    {
        public string ImageModel { get; init; } = "dall-e-3";
    }
}
