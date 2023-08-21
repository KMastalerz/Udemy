using RestaurantAPI.Models;

namespace RestaurantAPI.Interfaces
{
    public interface IRestaurantServices
    {
        RestaurantDto GetByID(int id);
        PageResult<RestaurantDto> GetAll(RestaurantQuery parameters);
        int Create(CreateRestaurantDto dto);
        void Delete(int id);
        void Update(UpdateRestaurantDto dto, int id);
    }
}
