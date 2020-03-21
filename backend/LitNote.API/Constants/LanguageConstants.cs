using System;
using System.Collections.Generic;
using LitNote.Models;

namespace LitNote.Constants
{
    public static class LanguageConstants
    {
        public static IReadOnlyDictionary<Language,string>
            ValidLanguageList => new Dictionary<Language,string> {
                { Language.CSharp, "CSharp"},
                { Language.Text, "Text"}
            };
    }
}