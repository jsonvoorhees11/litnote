using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using LitNote.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Runtime.InteropServices;
using System.Net;
using System.Text;
using System.Net.Http.Headers;

namespace LitNote.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitHubAuthController : ControllerBase
    {
        private readonly IGitHubOAuthSettings _githubOAuthSettings;
        private readonly HttpClient _httpClient;
        public GitHubAuthController(IGitHubOAuthSettings githubSettigs):base()
        {
            _githubOAuthSettings = githubSettigs;
            _httpClient = new HttpClient();
        }
        /// <summary>
        /// Get GitHub user info contains token and username
        /// </summary>
        /// <param name="code">Code that GitHub provided</param>
        /// <returns>GitHub user information</returns>
        [HttpGet]
        public async Task<ActionResult<User>> GetUserInfo([FromQuery]string code)
        {
            User user = await GetUserWithToken(code);
            if (user == default(User))
            {
                return default(User);
            }
            GitHubUserInfo userInfo = await GetGitHubUserInfo(user.BearerToken);
            if(userInfo == default(GitHubUserInfo))
            {
                return default(User);
            }
            user.Username = userInfo.Login;
            return user;
        }

        private async Task<User> GetUserWithToken(string code)
        {
            var user = new User();
            var url = _githubOAuthSettings.TokenGenerateUrl;
            var clientId = _githubOAuthSettings.OAuthClientId;
            var clientSecret = _githubOAuthSettings.OAuthClientSecret;
            var payload = new Dictionary<string, string>
            {
                {"client_id",clientId },
                {"client_secret",clientSecret },
                {"code",code }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json,Encoding.UTF8,"application/json");
            var tokenInfo = await _httpClient.PostAsync(url, content);
            if (!tokenInfo.IsSuccessStatusCode) return default;
            var tokenInfoString = await tokenInfo.Content.ReadAsStringAsync();
            user = new User(tokenInfoString);
            return user;
        }

        private async Task<GitHubUserInfo> GetGitHubUserInfo(string token)
        {
            var userInfoUrl = _githubOAuthSettings.GitHubUserInfoUrl;
            var httpRequestMessage = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(userInfoUrl),
                Headers =
                {
                    { HttpRequestHeader.Authorization.ToString(),"Bearer " + token }
                }
            };
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "Litnote-API");
            var response = await _httpClient.SendAsync(httpRequestMessage);
            if (!response.IsSuccessStatusCode) return default;
            var result = await response.Content.ReadAsStringAsync();

            GitHubUserInfo userInfo = JsonSerializer.Deserialize<GitHubUserInfo>(result);
            return userInfo;
        }
    }
}