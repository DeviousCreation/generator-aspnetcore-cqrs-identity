using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.Contracts
{
    public interface IAuthenticationService
    {
        Task SignInPartial(Guid userId, string pageLockedTo, bool passwordExpired = false);
        Task SignOutPartial();

        Task SignIn(Guid userId);
        Task SignOut();
        Task SignInFromPartial();
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserQueries _userQueries;

        public AuthenticationService(IHttpContextAccessor httpContextAccessor, IUserQueries userQueries)
        {
            this._httpContextAccessor = httpContextAccessor;
            this._userQueries = userQueries;
        }

        public async Task SignInPartial(Guid userId, string pageLockedTo, bool passwordExpired = false)
        {
            await this.SignOutPartial();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Upn, userId.ToString()),
            };
            claims.Add(new Claim("pageLockedTo", pageLockedTo));
            if (passwordExpired)
            {
                claims.Add(new Claim("passwordExpired", "1"));
            }
            await _httpContextAccessor.HttpContext.SignInAsync("login-partial", new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)));
        }

        public async Task SignOutPartial()
        {
            await _httpContextAccessor.HttpContext.SignOutAsync("login-partial");
        }

        public async Task SignIn(Guid userId)
        {
            await this.SignOutPartial();
            var systemProfileMaybe = await this._userQueries.GetSystemProfileByUserId(userId, CancellationToken.None);

            if (systemProfileMaybe.HasNoValue)
            {
                return;
            }

            var systemProfile = systemProfileMaybe.Value;
            var realClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Upn, userId.ToString()),
                        new Claim(ClaimTypes.Email, systemProfile.EmailAddress),
                        new Claim(ClaimTypes.GivenName, systemProfile.FirstName),
                        new Claim(ClaimTypes.Name, systemProfile.LastName),
                        new Claim(ClaimTypes.NameIdentifier, systemProfile.Username),
                    };

            var claimsIdentity = new ClaimsIdentity(
                realClaims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                //AllowRefresh = <bool>,
                // Refreshing the authentication session should be allowed.

                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                //IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };

            await this._httpContextAccessor.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }

        public async Task SignOut()
        {
            await this._httpContextAccessor.HttpContext.SignOutAsync();
        }

        public async Task SignInFromPartial()
        {
            var userId = Guid.Parse(this._httpContextAccessor.HttpContext.User.Claims
                .Single(x => x.Type == ClaimTypes.Upn).Value);
            
            await this.SignOutPartial();

            await this.SignIn(userId);
        }
    }
}
