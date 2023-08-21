using FluentValidation;

namespace MinimalAPI.ToDo
{
    public class ValidatonFilter<T> : IEndpointFilter where T : class
    {
        private readonly IValidator<T> _validator;

        public ValidatonFilter(IValidator<T> validator)
        {
            _validator = validator;
        }

        public async ValueTask<object> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
        {
            var validatable = context.Arguments.SingleOrDefault(x => x?.GetType() == typeof(T)) as T;

            if (validatable is null)
            {
                return Results.BadRequest("Couldn't write body to request model");
            }

            var validationResult = await _validator.ValidateAsync(validatable);

            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }

            return await next(context);
        }
    }
}