namespace MinimalAPI.ToDo
{
    public class ToDo
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string Value { get; set; }
        public bool IsCompleted { get; set; }
    }
}
