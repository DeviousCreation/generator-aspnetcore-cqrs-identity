using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Web.Infrastructure.Constants;
using JetBrains.Annotations;
using MaybeMonad;
using Microsoft.AspNetCore.Http;

namespace DeviousCreation.CqrsIdentity.Web.Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public CurrentUserService([NotNull] IHttpContextAccessor contextAccessor)
        {
            this._contextAccessor = contextAccessor ?? throw new ArgumentNullException(nameof(contextAccessor));
        }

        public Maybe<CurrentUser> CurrentUser
        {
            get
            {
                if (!this._contextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    return Maybe<CurrentUser>.Nothing;
                }

                if (this._contextAccessor.HttpContext.User.HasClaim(x => x.Type == ClaimTypes.Email))
                {
                    var currentUser = new CurrentUser(
                        Guid.Parse(this._contextAccessor.HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Upn).Value),
                        this._contextAccessor.HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Email).Value,
                        this._contextAccessor.HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value,
                        this._contextAccessor.HttpContext.User.HasClaim(x => x.Type == CustomClaimTypes.IsAdmin));
                    return currentUser;
                }
                else
                {
                    var currentUser = new CurrentUser(
                        Guid.Parse(this._contextAccessor.HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Upn).Value));
                    return currentUser;
                }
                
            }
        }
    }
}
