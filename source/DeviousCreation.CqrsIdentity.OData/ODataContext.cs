// TOKEN_COPYRIGHT_TEXT

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeviousCreation.CqrsIdentity.OData
{
    public sealed class ODataContext : DbContext
    {
        public ODataContext(DbContextOptions<ODataContext> options) : base(options)
        {
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<User.User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User.User>(this.ConfigureUser);
        }

        private void ConfigureUser(EntityTypeBuilder<User.User> config)
        {
            config.ToTable("vwUser", "Odata");
            config.HasKey(x => x.Id);
        }
    }
}