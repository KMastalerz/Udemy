using Microsoft.AspNetCore.Mvc;
using RestaurantAPI.Interfaces;
using RestaurantAPI.Models;

namespace RestaurantAPI.Controllers
{
    [Route("api/restaurant/{restaurantId}/dish")]
    [ApiController]
    public class DishController : ControllerBase
    {

        public readonly IDishService _dishService;
        public DishController(IDishService dishService)
        {
            _dishService = dishService;
        }
        [HttpPost]
        public ActionResult Post([FromRoute] int restaurantId, [FromBody] CreateDishDto dto)
        {
            var newDishId = _dishService.Create(restaurantId, dto);

            return Created($"api/restaurant/{restaurantId}/dish/{newDishId}", null);
        }

        [HttpGet]
        public ActionResult<IEnumerable<DishDto>> GetAll([FromRoute] int restaurantId)
        {
            var dishesDtos = _dishService.GetAll(restaurantId);
            return Ok(dishesDtos);
        }

        [HttpGet("{dishId}")]
        public ActionResult<DishDto> Get([FromRoute] int restaurantId, [FromRoute] int dishId)
        {
            var dishDto = _dishService.Get(restaurantId, dishId);

            return Ok(dishDto);
        }

        [HttpPut("{dishId}")]
        public ActionResult<DishDto> Update([FromBody] UpdateDishDto dto, [FromRoute] int restaurantId, [FromRoute] int dishId)
        {
            _dishService.Update(dto, restaurantId, dishId);

            return Ok();
        }

        [HttpDelete("{dishId}")]
        public ActionResult<DishDto> Delete([FromRoute] int restaurantId, [FromRoute] int dishId)
        {
            _dishService.Delete(restaurantId, dishId);

            return NoContent();
        }


        [HttpDelete]
        public ActionResult<DishDto> DeleteAll([FromRoute] int restaurantId)
        {
            _dishService.DeleteAll(restaurantId);

            return NoContent();
        }
    }
}
