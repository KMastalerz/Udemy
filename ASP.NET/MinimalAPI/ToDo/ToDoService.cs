namespace MinimalAPI.ToDo
{
    public class ToDoService : IToDoService
    {
        public ToDoService()
        {
            var sampleToDo = new ToDo { Value = "Learn minimalAPI" };

            _toDos[sampleToDo.ID] = sampleToDo;
        }

        private readonly Dictionary<Guid, ToDo> _toDos = new();

        public ToDo GetByID(Guid id)
        {
            return _toDos.GetValueOrDefault(id);
        }

        public List<ToDo> GetAll()
        {
            return _toDos.Values.ToList();
        }

        public void Create(ToDo toDo)
        {
            if (toDo is null)
            {
                return;
            }

            _toDos[toDo.ID] = toDo;
        }

        public void Update(ToDo toDo)
        {
            var existingToDo = GetByID(toDo.ID);

            if (existingToDo is null)
            {
                return;
            }

            _toDos[toDo.ID] = toDo;
        }

        public void Delete(Guid id)
        {
            _toDos.Remove(id);
        }

    }
}
