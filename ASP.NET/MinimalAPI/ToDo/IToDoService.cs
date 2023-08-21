namespace MinimalAPI.ToDo
{
    public interface IToDoService
    {
        void Create(ToDo toDo);
        void Delete(Guid id);
        List<ToDo> GetAll();
        ToDo GetByID(Guid id);
        void Update(ToDo toDo);
    }
}