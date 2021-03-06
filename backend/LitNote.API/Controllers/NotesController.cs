using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using LitNote.Services;
using LitNote.Models;
using System;
using System.Linq;

namespace LitNote.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NoteService _NoteService;

        public NotesController(NoteService NoteService)
        {
            _NoteService = NoteService;
        }

        [HttpGet]
        public ActionResult<List<Note>> Get() =>
            _NoteService.Get();

        [HttpGet("{id}", Name = "GetNote")]
        public ActionResult<Note> GetNote(string id)
        {
            var Note = _NoteService.Get(id);

            if (Note == null)
            {
                return NotFound();
            }

            return Note;
        }

        [HttpPost]
        public ActionResult<Note> Create(Note note)
        {
            var mappedNote = new Note(note);
            var createdNote = _NoteService.Create(mappedNote);
            if(createdNote == null)
            {
                return BadRequest(ModelState);
            }
            return CreatedAtRoute("GetNote", new { id = createdNote.Id.ToString() }, mappedNote);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Note noteIn)
        {
            var note = _NoteService.Get(id);

            if (note == null)
            {
                return NotFound();
            }

            _NoteService.Update(id, noteIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var Note = _NoteService.Get(id);

            if (Note == null)
            {
                return NotFound();
            }

            _NoteService.Remove(Note.Id);

            return NoContent();
        }

        [HttpGet("supported-languages")]
        public IActionResult GetSupportedLanguage()
        {
            List<string> languages = Enum.GetNames(typeof(Language)).ToList();
            return Ok(languages);
        }
    }
}
