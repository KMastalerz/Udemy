namespace RestaurantAPI.Entities
{
    public class Restaurant
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public bool HasDelivery { get; set; }
        public string? ContactEmail { get; set; }
        public string? ContactNumber { get; set; }
        public int? CreatedByID { get; set; }
        public int AddressID { get; set; }
        public virtual Address Address { get; set; } //ref to address
        public virtual List<Dish>? Dishes { get; set; } //ref to dishes
        public virtual User CreatedBy { get; set; } //who created this rss

    }
}
