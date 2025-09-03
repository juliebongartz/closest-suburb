using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using aspnet_back_end.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;


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
        public async Task<Suburb> Get(double lat, double longi) // 
        {
            _logger.LogInformation("Finding your closest suburb");

            var filePath = Path.Combine(AppContext.BaseDirectory, "suburbs.json");
            var json = await System.IO.File.ReadAllTextAsync(filePath);
            var suburbs = JsonSerializer.Deserialize<List<Suburb>>(json); // gives list of suburb objects
            // compare user input lat long with every one in list and order suburbs                                          
            var orderedSubs = suburbs.OrderBy(s => Distance(lat, longi, s.Latitude, s.Longitude));
            var closestSub = orderedSubs.First(); // Get first i.e. closest
            return closestSub;
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
