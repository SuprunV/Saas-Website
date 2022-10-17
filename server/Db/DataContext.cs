using Microsoft.EntityFrameworkCore;
using server.Enums;
using server.Models;

namespace server.Db
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {  }       
        public DbSet<User>? Users { get; set; }
        public DbSet<Client>? Clients { get; set; }
        public DbSet<Master>? Masters { get; set; } 
        public DbSet<Company>? Companies { get; set; } 
        public DbSet<Service>? Services { get; set; } 
        public DbSet<Appointment>? Appointments { get; set; } 
        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            mb.HasPostgresEnum<Role>();
            mb.HasPostgresEnum<Gender>();

            mb.Entity<User>().ToTable("Users").HasKey(x => x.Id);
            mb.Entity<User>().HasOne(x => x.Company)
            .WithMany(x => x.CompanyUsers)
            .HasForeignKey(x => x.companyId);
            
            mb.Entity<Company>().ToTable("Companies").HasKey(x => x.Id);
            mb.Entity<Company>().HasOne(x => x.User)
            .WithMany(x => x.Companies)
            .HasForeignKey(x => x.userId);
            
            mb.Entity<MasterService>().ToTable("Master&Service")
            .HasKey(key => new { key.masterId, key.serviceId });

            mb.Entity<Client>().ToTable("Clients").HasKey(x => x.Id);
            mb.Entity<Client>().HasOne(x => x.User)
            .WithMany(x => x.Clients)
            .HasForeignKey(x => x.userId);
            
            mb.Entity<Master>().ToTable("Masters").HasKey(x => x.Id);
            mb.Entity<Master>().HasOne(x => x.User)
            .WithMany(x => x.Masters)
            .HasForeignKey(x => x.userId);

            mb.Entity<Service>().ToTable("Services").HasKey(x => x.Id);
            mb.Entity<Service>().HasOne(x => x.Company)
            .WithMany(x => x.CompanyServices)
            .HasForeignKey(x => x.companyId);
          
            mb.Entity<Appointment>().ToTable("Appointments").HasKey(x => x.Id);
            
            mb.Entity<Appointment>().HasOne(x => x.Client)
            .WithMany(x => x.AppointmentClient)
            .HasForeignKey(x => x.clientId);
            mb.Entity<Appointment>().HasOne(x => x.Service)
            .WithMany(x => x.AppointmentService)
            .HasForeignKey(x => x.serviceId);
             mb.Entity<Appointment>().HasOne(x => x.Master)
            .WithMany(x => x.AppointmentMaster)
            .HasForeignKey(x => x.masterId);

            mb.UseIdentityColumns();
        }
       

    }
}