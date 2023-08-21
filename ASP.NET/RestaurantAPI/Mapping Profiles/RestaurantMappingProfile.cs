using AutoMapper;
using RestaurantAPI.Entities;
using RestaurantAPI.Models;

namespace RestaurantAPI.Mapping_Profiles
{
    public class RestaurantMappingProfile : Profile
    {
        public RestaurantMappingProfile()
        {
            CreateMap<Restaurant, RestaurantDto>()
                .ForMember(m => m.City, c => c.MapFrom(s => s.Address.City))
                .ForMember(m => m.Street, c => c.MapFrom(s => s.Address.Street))
                .ForMember(m => m.PostalCode, c => c.MapFrom(s => s.Address.PostalCode));

            //nie musze mapowac gdy nazwy, typy i "zrodlo" sa wakie same. 
            CreateMap<Dish, DishDto>();

            CreateMap<CreateRestaurantDto, Restaurant>()
                .ForMember(r => r.Address,
                    c => c.MapFrom(dto => new Address()
                    { City = dto.City, PostalCode = dto.PostalCode, Street = dto.Street }));

            CreateMap<CreateDishDto, Dish>();

            CreateMap<DishDto, Dish>();
        }
    }
}
