﻿namespace RestaurantAPI.Entities
{
    public class Dish
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int RestaurantID { get; set; }
        public virtual Restaurant Restaurant { get; set; } //ref to restaurant
    }
}
