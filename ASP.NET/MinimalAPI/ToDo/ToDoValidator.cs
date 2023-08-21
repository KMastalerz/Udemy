using FluentValidation;

namespace MinimalAPI.ToDo
{
    public class ToDoValidator : AbstractValidator<ToDo>
    {
        public ToDoValidator()
        {
            RuleFor(t => t.Value)
                .NotEmpty()
                .NotNull()
                .MinimumLength(5)
                .WithMessage("Value of a todo must be at least 5 chars");
        }
    }
}
