using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantAPI.Interfaces;
using RestaurantAPI.Models;
using System.Security.Claims;

namespace RestaurantAPI.Controllers
{
    [Route("api/restaurant")]
    [ApiController]//lose ModelState.IsValid checks
    [Authorize] //only logged in 
    public class RestaurantController : ControllerBase
    {
        //private readonly RestaurantDbContext _dbContext;
        //private readonly IMapper _mapper;
        private readonly IRestaurantServices _restaurantServices;
        public RestaurantController(IRestaurantServices restaurantServices)//RestaurantDbContext dbContext, IMapper mapper
        {
            //_dbContext = dbContext;
            //_mapper = mapper;
            _restaurantServices = restaurantServices;
        }
        [HttpGet]
        //[Authorize(Policy = "HasNationality")]//we allow this action without logging in
        //[Authorize(Policy = "AgeRestriction")]//we allow this action without logging in
        //[Authorize(Policy = "MinRestaurantCount")]//we allow this action without logging in
        [AllowAnonymous]//we allow this action without logging in
        public ActionResult<IEnumerable<RestaurantDto>> GetAll([FromBody] RestaurantQuery parameters)
        {
            //Thread.Sleep(4000);
            //var restaurants = _dbContext
            //    .Restaurants
            //    .Include(r => r.Address)
            //    .Include(r => r.Dishes)
            //    .ToList();


            //var restaurantsDtos = _mapper.Map<List<RestaurantDto>>(restaurants);
            var restaurantsDtos = _restaurantServices.GetAll(parameters);

            //if (restaurantsDtos is null)
            //    return NotFound();

            return Ok(restaurantsDtos);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]//we allow this action without logging in
        public ActionResult<RestaurantDto> Get([FromRoute] int id)
        {
            //var restaurant = _dbContext
            //    .Restaurants
            //    .Include(r => r.Address)
            //    .Include(r => r.Dishes)
            //    .FirstOrDefault(r => r.ID == id);

            //.Where(r => r.ID == id)

            //if (restaurant is null)
            //    return NotFound();

            //var restaurantDto = _mapper.Map<RestaurantDto>(restaurant);

            var restaurantDto = _restaurantServices.GetByID(id);

            //if (restaurantDto is null)
            //    return NotFound();

            return Ok(restaurantDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Manager")] //HttpContext.User.IsInRole("Admin"); //in code is harder to maintain
        public ActionResult CreateRestaurant([FromBody] CreateRestaurantDto dto)
        {
            //instead of using a lot of if statements, we can validate differently. we need to add attributes to passed dto
            //sa tez inne atrybuty validacji, sprawdzajace credit card, email, phone, range, regex, porownanie

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var restaurant = _mapper.Map<Restaurant>(dto);

            //_dbContext.Restaurants.Add(restaurant);
            //_dbContext.SaveChanges();
            var userID = User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var id = _restaurantServices.Create(dto);

            return Created($"api/restaurant/{id}", null);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            _restaurantServices.Delete(id);

            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult Update([FromBody] UpdateRestaurantDto dto, [FromRoute] int id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            _restaurantServices.Update(dto, id);


            return Ok();
        }

        [HttpPost("{randomgenerator}")]
        [AllowAnonymous]//we allow this action without logging in
        public ActionResult CreateBogusData([FromQuery] int count)
        {
            var faker = new Bogus.Faker("pl");

            var restaurantAdjectives = new List<string> { "Spicy", "Delicious", "Exotic", "Cozy", "Charming", "Boring" };
            var restaurantNouns = new List<string> { "Bistro", "Cafe", "Grill", "Eatery", "Diner", "Restaurant" };
            var emails = new List<string> { "@wp.pl", "@gmail.com", "@outlook.com", "@something.pl", "@o2.pl", "@notknown.pl" };
            for (int i = 0; i < count; i++)
            {
                var noun = faker.PickRandom(restaurantNouns);
                var name = $"{faker.PickRandom(restaurantAdjectives)} {faker.Name.FirstName()} {noun}";

                var dto =
                    new CreateRestaurantDto()
                    {
                        Name = name,
                        Description = faker.Lorem.Paragraph(),
                        Category = noun,
                        HasDelivery = faker.Random.Bool(),
                        ContactEmail = $"{name.ToLower().Replace(" ", "")}{faker.PickRandom(emails)}",
                        City = faker.Address.City(),
                        Street = faker.Address.StreetName(),
                        PostalCode = faker.Address.ZipCode()
                    };

                _restaurantServices.Create(dto);
            }

            return Ok();
        }
    }
}
