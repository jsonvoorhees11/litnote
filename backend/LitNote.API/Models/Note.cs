using System;

namespace LitNote.Models
{
    public class Note
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
        public long CreatedAt { get; set; }
        public Note()
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = DateTimeOffset.Now.ToUnixTimeMilliseconds();
        }
        public Note(Note input) : this()
        {
            Content = input.Content;
            Description = input.Description;
            Creator = input.Creator;
        }
    }
}