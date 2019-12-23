// TOKEN_COPYRIGHT_TEXT

using System;
using System.Data;
using System.Data.SqlClient;
using DeviousCreation.CqrsIdentity.Queries.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace DeviousCreation.CqrsIdentity.Queries.ConnectionProviders
{
    public class SqlConnectionProvider : IDbConnectionProvider
    {
        private readonly string _connectionString;

        public SqlConnectionProvider(IOptions<QuerySettings> querySettings)
        {
            if (querySettings == null)
            {
                throw new ArgumentNullException(nameof(querySettings));
            }

            this._connectionString = querySettings.Value.ConnectionString;
        }

        public IDbConnection Connection => new SqlConnection(this._connectionString);
    }
}