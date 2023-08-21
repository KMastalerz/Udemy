using FluentValidation;
using RestaurantAPI.Entities;
using System.Text.RegularExpressions;

namespace RestaurantAPI.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(RestaurantDbContext dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .Custom((value, context) =>
                {
                    if (dbContext.Users.Any(u => u.Email == value))//check if email is used
                    {
                        context.AddFailure("Email", "That email is taken.");
                    }
                });

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8)
                .Custom((value, context) =>
                {
                    var regex = new Regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W]).+$");
                    if (!regex.IsMatch(value ?? ""))
                    {
                        context.AddFailure("Password", "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
                    }
                });

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .Equal(e => e.Password)
                .WithMessage("Both passwords must be the same."); ;


        }
    }
}
