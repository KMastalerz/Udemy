using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Models
{
    public class CreateRestaurantDto
    {
        //restaurant part
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public bool HasDelivery { get; set; }
        [EmailAddress]
        public string? ContactEmail { get; set; }
        [Phone]
        public string? ContactNumber { get; set; }

        //address part
        [Required]
        [MaxLength(100)]
        public string City { get; set; }
        [Required]
        [MaxLength(100)]
        public string Street { get; set; }
        [Required]
        public string PostalCode { get; set; }

    }
}
