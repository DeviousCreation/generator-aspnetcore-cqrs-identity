using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IUserQueries
    {
        Task<StatusCheckModel> CheckForPresenceOfUserByUsername(string username, CancellationToken cancellationToken);
        Task<StatusCheckModel> CheckForPresenceOfUserByEmailAddress(string username,
            CancellationToken cancellationToken);
    }

    public sealed class StatusCheckModel
    {
        public StatusCheckModel(bool isPresent)
        {
            this.IsPresent = isPresent;
        }

        public bool IsPresent { get; }
    }
}
