// TOKEN_COPYRIGHT_TEXT

using System.Data;

namespace DeviousCreation.CqrsIdentity.Queries.Contracts
{
    public interface IDbConnectionProvider
    {
        IDbConnection Connection { get; }
    }
}