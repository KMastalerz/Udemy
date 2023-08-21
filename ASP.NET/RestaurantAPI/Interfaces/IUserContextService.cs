using System.Security.Claims;

namespace RestaurantAPI.Interfaces
{
    public interface IUserContextService
    {
        ClaimsPrincipal User { get; }
        int? GetUserID { get; }
    }
}
