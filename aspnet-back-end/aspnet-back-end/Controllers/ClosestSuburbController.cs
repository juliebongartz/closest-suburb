using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace aspnet_back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClosestSuburbController
        : ControllerBase
    {
        private readonly ILogger<ClosestSuburbController> _logger;

        public ClosestSuburbController(ILogger<ClosestSuburbController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<Suburb> Get()
        {
            _logger.LogInformation("Finding your closest suburb");

            var filePath = Path.Combine(AppContext.BaseDirectory, "suburbs.json");
            var json = await System.IO.File.ReadAllTextAsync(filePath);
            var suburbs = JsonSerializer.Deserialize<List<Suburb>>(json);
            return suburbs?.First();
        }
    }
}
