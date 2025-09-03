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
        public async Task<Suburb> Get(double lat, double long)
        {
            _logger.LogInformation("Finding your closest suburb");

            var filePath = Path.Combine(AppContext.BaseDirectory, "suburbs.json");
            var json = await System.IO.File.ReadAllTextAsync(filePath);
            var suburbs = JsonSerializer.Deserialize<List<Suburb>>(json);
            return suburbs?.First();
        }

        // Distance helper function - Euclidean distance a^2 + b^2 = c^2
        private static double Distance(double lat1, double long1, double lat2, double long2)
        {
            var LatDist = lat1 - lat2;
            var LongDist = long1 - long2;
            var euc = Math.Sqrt((LatDist * LatDist) + (LongDist * LongDist));
            return euc;
        }
    }
}
