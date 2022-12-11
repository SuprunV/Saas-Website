using Microsoft.EntityFrameworkCore;
using server.Enums;
using server.Models;

namespace server.Db
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {  }       
        public DbSet<User>? Users { get; set; }
        // public DbSet<Admin>? Admins { get; set; } 
        public DbSet<Company>? Companies { get; set; } 
        public DbSet<Service>? Services { get; set; } 
        public DbSet<ServiceMaster>? ServiceMaster { get; set; } 
        public DbSet<Appointment>? Appointments { get; set; } 
        public DbSet<Timetable>? Timetables { get; set; } 
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
            
            mb.Entity<Timetable>().ToTable("Timetables").HasKey(x => x.Id);
              mb.Entity<Timetable>().HasOne(x => x.Company)
            .WithMany(x => x.CompanyTimetable)
            .HasForeignKey(x => x.companyId);
            

            mb.Entity<ServiceMaster>().ToTable("ServiceMaster").HasIndex(p => new {p.masterId, p.serviceId}).IsUnique();
            mb.Entity<ServiceMaster>().ToTable("ServiceMaster").HasKey(x => x.Id);
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
            mb.Entity<Company>().HasData(
                new Company
                {
                    Id = 1,
                    companyName = "BeautySalon",
                    companyAlias = "myfircom",
                    address = "Maleva 6, 11711 Tallinn",
                    img = "/Uploads/CompanyProfileImages/4.jpg",
                
            
                },
                new Company
                {
                    Id = 2,
                    companyName = "MassageSalon",
                    address = "Kadaka tee 45, 12915 Tallinn",
                    img = "/Uploads/Noimage.png",
                 
                }
            );
            mb.Entity<Service>().HasData(
                new Service
                {
                    Id = 1,
                    name = "Manicure",
                    price = 35,
                    duration = 120,
                    description = "Manicure with massage without nail polish or with base polish",
                    img = "/Uploads/ServiceImages/1.jpg",
                    companyId = 1
                },
                new Service
                {
                    Id = 2,
                    name = "Pedicure",
                    price = 45,
                    duration = 60,
                    description = "Pedicure with massage without nail polish or with base polish",
                    img = "/Uploads/ServiceImages/2.jpg",
                    companyId = 1
                },
                new Service
                {
                    Id = 3,
                    name = "Lashes extension",
                    price = 35,
                    duration = 110,
                    description = "Lashes extension - 2D, 3D",
                    img = "/Uploads/ServiceImages/3.jpg",
                    companyId = 1
                },
                new Service
                {
                    Id = 4,
                    name = "Hand massage",
                    price = 15,
                    duration = 20,
                    description = "Hand massage",
                    img = "/Uploads/ServiceImages/4.jpg",
                    companyId = 2
                },
                new Service
                {
                    Id = 5,
                    name = "Body massage",
                    price = 50,
                    duration = 60,
                    description = "Body massage",
                    img = "/Uploads/ServiceImages/5.jpg",
                    companyId = 2
                }
            );
             mb.Entity<Appointment>().HasData(
                new Appointment{
                    Id = 1,
                    date = "2022-10-27T12:15:00.942Z", 
                    clientId = 4,
                    serviceId = 1,
                    masterId = 1

                },
                new Appointment{
                    Id = 2,
                    date = "2022-11-27T14:00:00.942Z",
                    clientId = 4,
                    serviceId = 2,
                    masterId = 2,
                },
                  new Appointment{
                    Id = 3,
                    date = "2022-10-27T15:45:00.942Z", 
                    masterId = 2,
                    serviceId = 3,
                    clientId = 3,

                }
            );
                mb.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    login = "KristinaK@gmail.com",
                    name = "Kristina",
                    surname = "Koring",
                    password =  "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.MASTER,
                    img = "/Uploads/UserProfileImages/3.jpg",
                    gender = Gender.Female,
                    DoB = "1999-10-27T12:15:00.942Z",
                    companyId = 1
           
                },
                new User
                {
                    Id = 2,
                    name = "Levi",
                    surname = "Ackerman",
                    login = "levi-ackerman@gmail.com",
                    password = "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.MASTER,
                    DoB = "1975-10-27T12:15:00.942Z",
                    companyId = 1,
                    img = "/Uploads/UserProfileImages/1.jpg",
                    gender = Gender.Male,
           
                },
                new User
                {
                    Id = 3,
                    name = "Eren",
                    surname = "Yeager",
                    login = "eren-yeager@gmail.com",
                    password = "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.CLIENT,
                    DoB = "1999-10-27T12:15:00.942Z",
                    img = "/Uploads/UserProfileImages/2.jpg",
                    companyId = 1,
                    gender = Gender.Male,
                },
                new User
                {
                    Id = 4,
                    name = "Mari",
                    surname = "Curie",
                    login = "MariC@gmail.com",
                    password = "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.CLIENT,
                    DoB = "2005-10-27T12:15:00.942Z",
                    companyId = 1,
                    img = "/Uploads/Noimage.png",
                    gender = Gender.Female,
                },
                new User
                {
                    Id = 5,
                    login = "BeautySalon@gmail.com",
                    name = "Admin",
                    password = "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.ADMIN,
                    DoB = "1960-10-27T12:15:00.942Z",
                    img = "/Uploads/Noimage.png",
                    companyId = 1,
                  
                },
                new User
                {
                    Id = 6,
                    login = "MassageSalon@gmail.com",
                    name = "MassageSalonAdmin",
                    password = "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.ADMIN,
                    img = "/Uploads/Noimage.png",
                    DoB = "1989-10-27T12:15:00.942Z",
                    companyId = 2
                }
      
            );
             mb.Entity<ServiceMaster>().HasData(
                new ServiceMaster
                {
                    Id = 1,
                    masterId = 1,
                    serviceId = 1,
                },
                       new ServiceMaster
                {
                    Id = 2,
                    masterId = 2,
                    serviceId = 2,
                },
                  new ServiceMaster
                {
                    Id = 3,
                    masterId = 2,
                    serviceId = 3,
                }
                );
                 mb.Entity<Timetable>().HasData(
                new Timetable
                {
                    Id = 1,
                    companyId=1,
                    startTime = "09:00",  
                    endTime = "20:00",
                    weekday = Weekday.Thu,
                },
                new Timetable
                {
                    Id = 2,
                    companyId=1,
                    startTime = "09:00",  
                    endTime = "20:00",
                    weekday = Weekday.Sun,
                },
                     new Timetable
                {
                    Id = 3,
                    companyId=1,
                    startTime = "09:00",  
                    endTime = "20:00",
                    weekday = Weekday.Sat,
                }
           
                );
               
            mb.UseIdentityColumns();
        }
       

    }
}
