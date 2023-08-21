using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Authorization;
using RestaurantAPI.Entities;
using RestaurantAPI.Exceptions;
using RestaurantAPI.Interfaces;
using RestaurantAPI.Models;
using System.Linq.Dynamic.Core;

namespace RestaurantAPI.Services
{
    public class RestaurantServices : IRestaurantServices
    {
        private readonly RestaurantDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<RestaurantServices> _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserContextService _userContextService;

        public RestaurantServices(RestaurantDbContext dbContext, IMapper mapper, ILogger<RestaurantServices> logger
            , IAuthorizationService authorizationService, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _authorizationService = authorizationService;
            _userContextService = userContextService;
        }

        public RestaurantDto GetByID(int id)
        {
            var restaurant = _dbContext
                .Restaurants
                .Include(r => r.Address)
                .Include(r => r.Dishes)
                .FirstOrDefault(r => r.ID == id);

            //.Where(r => r.ID == id)

            if (restaurant is null) throw new NotFoundException("Restaurant not found");

            var result = _mapper.Map<RestaurantDto>(restaurant);

            return result;
        }

        public PageResult<RestaurantDto> GetAll(RestaurantQuery parameters)
        {

            var orderByExpression = $"{parameters.SortBy} {parameters.SortDirection}";  // Specify the column name and sort order

            var baseQuery = _dbContext
                .Restaurants
                .Include(r => r.Address)
                .Include(r => r.Dishes)
                .Where(r => parameters.SearchPhrase == null || (r.Name.ToLower().Contains(parameters.SearchPhrase.ToLower()) ||
                            r.Description.ToLower().Contains(parameters.SearchPhrase.ToLower())))
                .OrderBy(orderByExpression);

            //this could be: 

            //var columnSelectors = new Dictionary<string, Expression<Func<Restaurant, object>>>
            //{
            //    { nameof(Restaurant.ID), r => r.ID },
            //    { nameof(Restaurant.Name), r => r.Name },
            //    { nameof(Restaurant.Description), r => r.Description },
            //    { nameof(Restaurant.Category), r => r.Category },
            //};

            //var selectedColumn = columnSelectors[parameters.SortBy];

            //var baseQuery = _dbContext
            //    .Restaurants
            //    .Include(r => r.Address)
            //    .Include(r => r.Dishes)
            //    .Where(r => parameters.SearchPhrase == null || (r.Name.ToLower().Contains(parameters.SearchPhrase.ToLower()) ||
            //                r.Description.ToLower().Contains(parameters.SearchPhrase.ToLower())));


            //baseQuery = parameters.SortDirection == SortDirection.ASC
            //    ? baseQuery.OrderBy(selectedColumn)
            //    : baseQuery.OrderByDescending(selectedColumn);



            var restaurants = baseQuery
                .Skip(parameters.PageSize * (parameters.PageNumber - 1))
                .Take(parameters.PageSize)
                .ToList();

            var count = baseQuery
                .Count();

            if (restaurants is null) return null;

            var restaurantsDto = _mapper.Map<List<RestaurantDto>>(restaurants);

            var result = new PageResult<RestaurantDto>(restaurantsDto, count, parameters.PageSize, parameters.PageNumber);
            //var result = restaurants.Select(r=> new RestaurantDto()
            //{
            //    Name=r.Name,
            //    Description=r.Description,
            //    Category=r.Category,
            //    City=r.Address.City,
            //    ..
            //});

            return result;
        }

        public int Create(CreateRestaurantDto dto)
        {
            var restaurant = _mapper.Map<Restaurant>(dto);
            restaurant.CreatedByID = _userContextService.GetUserID;
            _dbContext.Restaurants.Add(restaurant);
            _dbContext.SaveChanges();

            return restaurant.ID;
        }

        public void Delete(int id)
        {
            var restaurant = _dbContext
                .Restaurants
                .FirstOrDefault(r => r.ID == id);

            if (restaurant is null) throw new NotFoundException("Restaurant not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, restaurant, new ResourceOperationRequirement(ResourceOperation.Delete)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbidException("Only user who created this, can delete this restaurant.");
            }

            //Delete associated address
            var address = restaurant.Address;
            if (address is not null)
            {
                _dbContext.Addresses.Remove(address);
            }

            //Delete associated dishes
            var dishes = restaurant.Dishes;
            if (dishes is not null && dishes.Any())
            {
                _dbContext.Dishes.RemoveRange(dishes);
            }

            _dbContext.Restaurants.Remove(restaurant);
            _dbContext.SaveChanges();
        }

        public void Update(UpdateRestaurantDto dto, int id)
        {
            var restaurant = _dbContext
                .Restaurants
                .FirstOrDefault(r => r.ID == id);

            if (restaurant is null) throw new NotFoundException("Restaurant not found");

            var authorizationResult = _authorizationService.AuthorizeAsync(_userContextService.User, restaurant, new ResourceOperationRequirement(ResourceOperation.Update)).Result;

            if (!authorizationResult.Succeeded)
            {
                throw new ForbidException("Only user who created this, can modify this restaurant.");
            }

            restaurant.Name = dto.Name;
            restaurant.Description = dto.Description;
            restaurant.HasDelivery = dto.HasDelivery;

            _dbContext.Restaurants.Update(restaurant);
            _dbContext.SaveChanges();
        }
    }
}
