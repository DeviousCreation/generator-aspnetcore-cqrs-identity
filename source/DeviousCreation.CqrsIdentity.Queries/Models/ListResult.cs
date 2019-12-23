using System.Collections.Generic;
using System.Collections.Immutable;

namespace DeviousCreation.CqrsIdentity.Queries.Models
{
    public class ListResult<TEntity>
        where TEntity : class
    {
        private readonly IEnumerable<TEntity> _entities;

        public ListResult(IEnumerable<TEntity> entities)
        {
            this._entities = entities;
        }

        public IReadOnlyCollection<TEntity> Entities => this._entities.ToImmutableList();
    }
}
