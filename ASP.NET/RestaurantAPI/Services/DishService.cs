using AutoMapper;
using RestaurantAPI.Entities;
using RestaurantAPI.Exceptions;
using RestaurantAPI.Interfaces;
using RestaurantAPI.Models;

namespace RestaurantAPI.Services
{
    public class DishService : IDishService
    {
        public readonly RestaurantDbContext _dbContext;
        public readonly IMapper _mapper;
        public DishService(RestaurantDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public int Create(int restaurantId, CreateDishDto dto)
        {
            var restaurant = _dbContext
                .Restaurants
                .FirstOrDefault(r => r.ID == restaurantId);

            //.Where(r => r.ID == id)

            if (restaurant is null) throw new NotFoundException("Restaurant not found");

            var dishEntity = _mapper.Map<Dish>(dto);

            dishEntity.RestaurantID = restaurantId;

            _dbContext.Dishes.Add(dishEntity);
            _dbContext.SaveChanges();

            return dishEntity.ID;
        }

        public void Delete(int restaurantId, int dishId)
        {
            var dish = _dbContext
                .Dishes
                .FirstOrDefault(d => d.ID == dishId && d.RestaurantID == restaurantId);

            if (dish is null) throw new NotFoundException("Dish not found");

            _dbContext.Dishes.Remove(dish);
            _dbContext.SaveChanges();

        }

        public void DeleteAll(int restaurantId)
        {
            var dishes = _dbContext
                .Dishes
                .Where(d => d.RestaurantID == restaurantId)
                .ToList();

            if (dishes is null) throw new NotFoundException("Dishes not found");

            _dbContext.Dishes.RemoveRange(dishes);
            _dbContext.SaveChanges();
        }

        public DishDto Get(int restaurantId, int dishId)
        {
            var dish = _dbContext
                .Dishes
                .FirstOrDefault(d => d.ID == dishId && d.RestaurantID == restaurantId);

            if (dish is null) throw new NotFoundException("Dish not found");

            var result = _mapper.Map<DishDto>(dish);

            return result;
        }

        public IEnumerable<DishDto> GetAll(int restaurantId)
        {
            //i can check if retaurant exists, and if this retaurant is connected to this dish

            var dishes = _dbContext
                .Dishes
                .Where(d => d.RestaurantID == restaurantId);

            if (dishes is null) throw new NotFoundException("Dishes not found");

            var result = _mapper.Map<IEnumerable<DishDto>>(dishes);

            return result;
        }

        public void Update(UpdateDishDto dto, int restaurantId, int dishId)
        {
            var dish = _dbContext
              .Dishes
              .FirstOrDefault(d => d.ID == dishId && d.RestaurantID == restaurantId);

            if (dish is null) throw new NotFoundException("Dish not found");

            dish.Name = dto.Name;
            dish.Description = dto.Description;
            dish.Price = dto.Price;

            _dbContext.Dishes.Update(dish);
            _dbContext.SaveChanges();
        }
    }
}

