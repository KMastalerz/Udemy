namespace RestaurantAPI.Entities
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Nationality { get; set; }
        public string PasswordHash { get; set; }
        public int RoleID { get; set; }
        public virtual Role Role { get; set; }
    }
}
