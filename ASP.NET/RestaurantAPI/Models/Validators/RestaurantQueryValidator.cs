using FluentValidation;
using RestaurantAPI.Entities;

namespace RestaurantAPI.Models.Validators
{
    public class RestaurantQueryValidator : AbstractValidator<RestaurantQuery>
    {
        private int[] allowedPageSizes = new[] { 5, 10, 20, 50, 100 };

        public RestaurantQueryValidator(RestaurantDbContext dbContext)
        {

            RuleFor(r => r.PageNumber).GreaterThanOrEqualTo(1);

            RuleFor(r => r.PageSize).Custom((value, context) =>
            {
                if (!allowedPageSizes.Contains(value))
                {
                    context.AddFailure("PageSize", $"Page size of {value} is not allowed, it must be in: [{string.Join(",", allowedPageSizes)}]");
                }
            });

        }
    }
}
