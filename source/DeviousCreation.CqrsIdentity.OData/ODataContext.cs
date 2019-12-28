// TOKEN_COPYRIGHT_TEXT

using DeviousCreation.CqrsIdentity.OData.Entities;
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

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(this.ConfigureUser);
            modelBuilder.Entity<Role>(this.ConfigureRole);
        }

        private void ConfigureRole(EntityTypeBuilder<Role> config)
        {
            config.ToTable("vwRole", "Odata");
            config.HasKey(x => x.Id);
        }

        private void ConfigureUser(EntityTypeBuilder<User> config)
        {
            config.ToTable("vwUser", "Odata");
            config.HasKey(x => x.Id);
        }
    }
}