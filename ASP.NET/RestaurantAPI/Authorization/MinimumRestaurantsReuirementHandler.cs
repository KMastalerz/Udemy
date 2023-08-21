using Microsoft.AspNetCore.Authorization;
using RestaurantAPI.Entities;
using System.Security.Claims;

namespace RestaurantAPI.Authorization
{
    public class MinimumRestaurantsReuirementHandler : AuthorizationHandler<MinimumRestaurantsReuirement>
    {
        private readonly ILogger<MinimumRestaurantsReuirementHandler> _logger;
        private readonly RestaurantDbContext _dbContext;

        public MinimumRestaurantsReuirementHandler(ILogger<MinimumRestaurantsReuirementHandler> logger, RestaurantDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumRestaurantsReuirement requirement)
        {
            var userID = int.Parse(context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);

            var count = _dbContext.Restaurants.Where(r => r.CreatedByID == userID).Count();

            _logger.LogInformation($"Checking restaurant count for user with ID {userID}");

            if (count >= requirement.MinimumRestaurants)
            {
                _logger.LogInformation($"Found {count} restaurants created by user with ID {userID}");
                context.Succeed(requirement);//he can do this
            }
            else _logger.LogInformation($"Didn't found sufficient restaurants created by user with ID {userID}");

            return Task.CompletedTask;
        }
    }
}
