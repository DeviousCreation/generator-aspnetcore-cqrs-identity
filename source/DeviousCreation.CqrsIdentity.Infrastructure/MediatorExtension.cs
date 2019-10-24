// TOKEN_COPYRIGHT_TEXT

using System.Linq;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Domain;
using MediatR;

namespace DeviousCreation.CqrsIdentity.Infrastructure
{
    internal static class MediatorExtension
    {
        public static async Task DispatchDomainEventsAsync(this IMediator mediator, DataContext ctx)
        {
            var domainEntities = ctx.ChangeTracker
                .Entries<Entity>()
                .Where(x => x.Entity.DomainEvents != null && x.Entity.DomainEvents.Any()).ToList();

            var domainEvents = domainEntities
                .SelectMany(x => x.Entity.DomainEvents)
                .ToList();

            domainEntities.ToList()
                .ForEach(entity => entity.Entity.DomainEvents.Clear());

            var tasks = domainEvents
                .Select(async domainEvent => { await mediator.Publish(domainEvent); });

            await Task.WhenAll(tasks);
        }
    }
}