using System.Collections.Generic;
using System.Linq;
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

        public List<Note> Get()
        {
            var notes = _notes.Find(book => true).ToList();
            notes.ForEach(n => n.Content = GetTrimmedCodeString(n.Content));
            return notes;
        }

        public Note Get(string id)
        {
            var note = _notes.Find<Note>(note => note.Id == id).FirstOrDefault();
            note.Content = GetTrimmedCodeString(note.Content);
            return note;
        }

        public Note Create(Note note)
        {
            _notes.InsertOne(note);
            return note;
        }

        public void Update(string id, Note noteIn) =>
            _notes.ReplaceOne(note => note.Id == id, noteIn);

        public void Remove(string id) => 
            _notes.DeleteOne(note => note.Id == id);

        private string GetTrimmedCodeString(string rawInput)
        {
            string result = rawInput.TrimStart();
            var splitedByNewLine = result.Split('\n');
            if(splitedByNewLine.Length < 2)
            {
                return result;
            }

            int countWhiteSpace = 0;
            var firstLine = splitedByNewLine[0];
            var firstLineWithExtraSpace = splitedByNewLine[1];
            foreach (char c in firstLineWithExtraSpace)
            {
                if (c != ' ')
                {
                    break;
                }
                countWhiteSpace++;
            }
            
            var stringArr = splitedByNewLine.Skip(1).Select(l =>
            {
                if(l.Length < countWhiteSpace)
                {
                    return l;
                }
                return l.Substring(countWhiteSpace);
            }).ToArray();

            result = firstLine + stringArr.Aggregate("",(curr,next)=>
            {
                return curr + "\n"+ next;
            });

            return result;
        }
    }
}