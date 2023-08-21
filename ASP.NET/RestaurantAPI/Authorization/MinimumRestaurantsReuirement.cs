using Microsoft.AspNetCore.Authorization;

namespace RestaurantAPI.Authorization
{
    public class MinimumRestaurantsReuirement : IAuthorizationRequirement
    {
        public int MinimumRestaurants { get; }
        public MinimumRestaurantsReuirement(int minimumRestaurants)
        {
            MinimumRestaurants = minimumRestaurants;
        }
    }
}
