using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models
{
    public class UpdateDishDto
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
