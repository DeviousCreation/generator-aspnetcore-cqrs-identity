// TOKEN_COPYRIGHT_TEXT

using System;
using System.Threading;
using System.Threading.Tasks;
using DeviousCreation.CqrsIdentity.Core.Contracts;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.RoleAggregate;
using DeviousCreation.CqrsIdentity.Domain.AggregatesModel.UserAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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

        public DbSet<Role> Roles { get; set; }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await this.SaveChangesAsync(cancellationToken);
            await this._mediator.DispatchDomainEventsAsync(this);
            return true;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(this.ConfigureUser);
            //modelBuilder.Entity<Profile>(this.ConfigureProfile);
            modelBuilder.Entity<PasswordHistory>(this.ConfigurePasswordHistory);
            modelBuilder.Entity<SecurityTokenMapping>(this.ConfigureSecurityTokenMapping);
            modelBuilder.Entity<SignInHistory>(this.ConfigureSignInHistory);
            modelBuilder.Entity<AuthenticatorApp>(this.ConfigureAuthenticatorApp);
            modelBuilder.Entity<AuthenticatorDevice>(this.ConfigureAuthenticatorDevice);
            modelBuilder.Entity<Role>(this.ConfigureRole);
            //modelBuilder.Entity<UserRole>(this.ConfigureUserRole);
        }

        private void ConfigureRole(EntityTypeBuilder<Role> config)
        {
            config.ToTable("role", "AccessProtection");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();

            var navigation = config.Metadata.FindNavigation(nameof(Role.RoleResources));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            
            config.OwnsMany(p => p.RoleResources, a =>
            {
                a.ToTable("RoleResource", "AccessProtection");
                a.HasKey(entity => entity.Id);
                a.Property(e => e.Id).ValueGeneratedNever();
                //a.WithOwner().HasForeignKey(x => x.Id);
                a.HasKey(e => e.Id);
                a.Property(x => x.Id).HasColumnName("ResourceId");
                a.Ignore(b => b.DomainEvents);
            });
        }

        private void ConfigureAuthenticatorDevice(EntityTypeBuilder<AuthenticatorDevice> config)
        {
            config.ToTable("authenticatorDevice", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();
        }

        private void ConfigureAuthenticatorApp(EntityTypeBuilder<AuthenticatorApp> config)
        {
            config.ToTable("authenticatorApp", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();
        }

        private void ConfigureUserRole(EntityTypeBuilder<UserRole> config)
        {
            config.ToTable("userRole", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);

        }

        private void ConfigureSignInHistory(EntityTypeBuilder<SignInHistory> config)
        {
            config.ToTable("signInHistory", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();
        }

        private void ConfigureSecurityTokenMapping(EntityTypeBuilder<SecurityTokenMapping> config)
        {
            config.ToTable("securityTokenMapping", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();
        }

        private void ConfigurePasswordHistory(EntityTypeBuilder<PasswordHistory> config)
        {
            config.ToTable("passwordHistory", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();
        }

        private void ConfigureProfile(EntityTypeBuilder<Profile> config)
        {
            config.ToTable("profile", "identity");
            config.HasKey(entity => entity.Id);
            config.Property(x => x.Id).HasColumnName("UserId");
            config.Ignore(b => b.DomainEvents);
        }

        private void ConfigureUser(EntityTypeBuilder<User> config)
        {
            config.ToTable("user", "identity");
            config.HasKey(entity => entity.Id);
            config.Ignore(b => b.DomainEvents);
            config.Property(e => e.Id).ValueGeneratedNever();

            var navigation = config.Metadata.FindNavigation(nameof(User.PasswordHistories));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            navigation = config.Metadata.FindNavigation(nameof(User.SecurityTokenMappings));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            navigation = config.Metadata.FindNavigation(nameof(User.SignInHistories));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            navigation = config.Metadata.FindNavigation(nameof(User.UserRoles));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            navigation = config.Metadata.FindNavigation(nameof(User.AuthenticatorApps));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            navigation = config.Metadata.FindNavigation(nameof(User.AuthenticatorDevices));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            config.OwnsOne(p => p.Profile, a =>
            {
                a.ToTable("profile", "identity");
                a.WithOwner().HasForeignKey(x=>x.Id);
                a.HasKey(e => e.Id);
                a.Property(x => x.Id).HasColumnName("UserId");
                a.Ignore(b => b.DomainEvents);
            });

            config.OwnsMany(p => p.UserRoles, a =>
            {
                a.ToTable("userRole", "identity");
                a.HasKey(entity => entity.Id);
                //a.WithOwner().HasForeignKey(x => x.Id);
                a.HasKey(e => e.Id);
                a.Property(e => e.Id).ValueGeneratedNever();
                a.Property(x => x.Id).HasColumnName("RoleId");
                a.Ignore(b => b.DomainEvents);
            });
        }
    }
}