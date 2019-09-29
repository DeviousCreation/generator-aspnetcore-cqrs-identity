using System.Data;

namespace DeviousCreation.CqrsIdentity.Queries.ConnectionProviders
{
    public interface IDbConnectionProvider
    {
        IDbConnection Connection { get; }
    }
}