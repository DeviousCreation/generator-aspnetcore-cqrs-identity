// TOKEN_COPYRIGHT_TEXT

using MaybeMonad;

namespace DeviousCreation.CqrsIdentity.Core.Contracts
{
    public interface ICurrentUserService
    {
        Maybe<CurrentUser> CurrentUser { get; }
    }
}