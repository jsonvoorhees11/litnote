using System.Collections.Generic;
using LitNote.Models;
using MongoDB.Driver;

namespace LitNote.Services
{
    public class NoteService
    {
        private readonly IMongoCollection<Note> _notes;

        public NoteService(IDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _notes = database.GetCollection<Note>(settings.NotesCollectionName);
        }

        public List<Note> Get() =>
            _notes.Find(book => true).ToList();

        public Note Get(string id) =>
            _notes.Find<Note>(note => note.Id == id).FirstOrDefault();

        public Note Create(Note note)
        {
            _notes.InsertOne(note);
            return note;
        }

        public void Update(string id, Note noteIn) =>
            _notes.ReplaceOne(note => note.Id == id, noteIn);

        public void Remove(string id) => 
            _notes.DeleteOne(note => note.Id == id);
    }
}