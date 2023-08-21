using RestaurantAPI.Models;

namespace RestaurantAPI.Interfaces
{
    public interface IDishService
    {
        int Create(int restaurantId, CreateDishDto dto);
        DishDto Get(int restaurantId, int dishId);
        IEnumerable<DishDto> GetAll(int restaurantId);
        public void Update(UpdateDishDto dto, int restaurantId, int dishId);
        public void Delete(int restaurantId, int dishId);
        public void DeleteAll(int restaurantId);
    }
}
