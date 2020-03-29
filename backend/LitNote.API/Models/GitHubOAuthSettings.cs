using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitNote.API.Models
{
    public class GitHubOAuthSettings : IGitHubOAuthSettings
    {
        public string OAuthClientId { get; set; }
        public string OAuthClientSecret { get; set; }
        public string AuthorizeUrl { get; set; }
        public string TokenGenerateUrl { get; set; }
        public string GitHubUserInfoUrl { get; set; }
    }

    public interface IGitHubOAuthSettings
    {
        string OAuthClientId { get; set; }
        string OAuthClientSecret { get; set; }
        string AuthorizeUrl { get; set; }
        string TokenGenerateUrl { get; set; }
        string GitHubUserInfoUrl { get; set; }
    }
}
