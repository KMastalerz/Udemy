namespace RestaurantAPI.Models
{
    public class RegisterUserDto
    {
        //Attributes replaced with fluent validator
        //[Required]
        public string Name { get; set; }
        //[Required]
        public string LastName { get; set; }
        //[Required]
        //[EmailAddress]
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Nationality { get; set; }
        //[Required]
        //[MinLength(8,
        //    ErrorMessage = "Password must be at least 8 characters long.")]
        //[RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W]).+$",
        //    ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")]
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public int RoleID { get; set; } = 1;
    }
}
