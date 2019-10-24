// TOKEN_COPYRIGHT_TEXT

using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Queries.Models;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IUserQueries
    {
        Task<StatusCheckModel> CheckForPresenceOfUserByUsername(string username, CancellationToken cancellationToken);

        Task<StatusCheckModel> CheckForPresenceOfUserByEmailAddress(
            string username, CancellationToken cancellationToken);
    }
}