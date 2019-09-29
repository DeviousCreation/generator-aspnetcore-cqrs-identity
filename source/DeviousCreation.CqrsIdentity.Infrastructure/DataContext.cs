using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeviousCreation.CqrsIdentity.Infrastructure
{
    public sealed class DataContext : DbContext, IUnitOfWork
    {
        private readonly IMediator _mediator;

        public DataContext(DbContextOptions<DataContext> options, IMediator mediator)
            : base(options)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public DbSet<User> Users { get; set; }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await this.SaveChangesAsync(cancellationToken);
            await this._mediator.DispatchDomainEventsAsync(this);
            return true;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}