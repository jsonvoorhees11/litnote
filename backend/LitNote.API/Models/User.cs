using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitNote.API.Models
{
    public class User
    {
        public string Username { get; set; }
        public string BearerToken { get; set; }

        public User()
        {

        }
        /// <summary>
        /// Create new instance with string returned by github authorize
        /// </summary>
        /// <param name="tokenInfoString"></param>
        public User(string tokenInfoString)
        {
            var tokenAndType = tokenInfoString.Split('&');

            if (tokenAndType.Length < 2)
            {
                return;
            }
            var tokenParts = tokenAndType[0].Split('=');
            if (tokenParts.Length < 2)
            {
                return;
            }

            BearerToken =  tokenParts[1];
        }
    }
}
