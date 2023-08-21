using Microsoft.AspNetCore.Authorization;

namespace MinimalAPI.ToDo
{
    public static class ToDoRequests
    {
        public static WebApplication RegisterEndpoints(this WebApplication app)
        {
            app.MapGet("/todos", ToDoRequests.GetAll)
                .Produces<List<ToDo>>()
                .WithTags("To Dos")
                .RequireAuthorization();
            app.MapGet("/todos/{id}", ToDoRequests.GetByID)
                .Produces<ToDo>()
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("To Dos");
            app.MapPost("/todos", ToDoRequests.Create)
                .Produces<ToDo>(StatusCodes.Status201Created)
                .Accepts<ToDo>("application/json")
                .WithTags("To Dos")
                .AddEndpointFilter<ValidatonFilter<ToDo>>();
            app.MapPut("/todos/{id}", ToDoRequests.Update)
                .Produces(StatusCodes.Status204NoContent)
                .Produces(StatusCodes.Status404NotFound)
                .Accepts<ToDo>("application/json")
                .WithTags("To Dos")
                .WithValidator<ToDo>();
            app.MapDelete("/todos/{id}", ToDoRequests.Delete)
                .Produces(StatusCodes.Status204NoContent)
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("To Dos")
                .ExcludeFromDescription();
            return app;
        }

        public static IResult GetAll(IToDoService service)
        {
            var todos = service.GetAll();

            return Results.Ok(todos);
        }
        public static IResult GetByID(IToDoService service, Guid id)
        {
            var todo = service.GetByID(id);

            if (todo is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(todo);
        }
        public static IResult Create(IToDoService service, ToDo todo)
        {
            //var validationResult = validator.Validate(todo);

            //if (!validationResult.IsValid)
            //{
            //    return Results.BadRequest(validationResult.Errors);
            //}

            service.Create(todo);

            return Results.Created($"/todos/{todo.ID}", todo);
        }
        public static IResult Update(IToDoService service, Guid id, ToDo todo)
        {
            //var validationResult = validator.Validate(todo);

            //if (!validationResult.IsValid)
            //{
            //    return Results.BadRequest(validationResult.Errors);
            //}

            var todoCheck = service.GetByID(id);

            if (todoCheck is null)
            {
                return Results.NotFound();
            }

            service.Update(todo);

            return Results.Ok();
        }
        [Authorize]
        public static IResult Delete(IToDoService service, Guid id)
        {
            var todoCheck = service.GetByID(id);

            if (todoCheck is null)
            {
                return Results.NotFound();
            }

            service.Delete(id);

            return Results.NoContent();
        }
    }
}
