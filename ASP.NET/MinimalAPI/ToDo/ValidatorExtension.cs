using FluentValidation;

namespace MinimalAPI.ToDo;
public static class ValidatorExtension
{
    //this processes the body twice
    public static RouteHandlerBuilder WithValidator<T>(this RouteHandlerBuilder builder) where T : class
    {
        builder.Add(async endpointBuilder =>
        {
            var originalDelegate = endpointBuilder.RequestDelegate;
            endpointBuilder.RequestDelegate = async httpContext =>
            {
                var validator = httpContext.RequestServices.GetRequiredService<IValidator<T>>();

                httpContext.Request.EnableBuffering();//to save index from reader

                var body = await httpContext.Request.ReadFromJsonAsync<T>();

                if (body is null)
                {
                    httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await httpContext.Response.WriteAsync("Couldn't write body to request model");
                    return;
                }

                var validationResult = validator.Validate(body);

                if (!validationResult.IsValid)
                {
                    httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await httpContext.Response.WriteAsJsonAsync(validationResult.Errors);
                    return;
                }

                httpContext.Request.Body.Position = 0;  //reset reader property

                await originalDelegate(httpContext);//we add http context
            };


        });

        return builder;
    }
}
