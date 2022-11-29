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
            
            // mb.Entity<MasterService>().ToTable("Master&Service")
            // .HasKey(key => new { key.masterId, key.serviceId });

            // mb.Entity<Client>().ToTable("Clients").HasKey(x => x.Id);
            // mb.Entity<Client>().HasOne(x => x.User);
            // mb.Entity<Admin>().ToTable("Admins").HasOne(x => x.User);
            
            // mb.Entity<Master>().ToTable("Masters").HasKey(x => x.Id);
            // mb.Entity<Master>().HasOne(x => x.User);

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
                    address = "Maleva 6",
                    img = "https://img.freepik.com/free-vector/company-concept-illustration_114360-2581.jpg?w=2000",
                
            
                },
                new Company
                {
                    Id = 2,
                    companyName = "MassageSalon",
                    address = "Kadaka 45",
                    img = "https://img.freepik.com/free-vector/company-concept-illustration_114360-2581.jpg?w=2000",
                 
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
                    img = "https://img.freepik.com/free-photo/manicurist-master-makes-manicure-woman-s-hands-spa-treatment-concept_186202-7769.jpg?w=2000",
                    companyId = 1
                },
                new Service
                {
                    Id = 2,
                    name = "Pedicure",
                    price = 45,
                    duration = 60,
                    description = "Pedicure with massage without nail polish or with base polish",
                    img = "https://img.freepik.com/premium-photo/pedicure-moisturizing-cram-after-foot-rasp_79295-4791.jpg?w=2000",
                    companyId = 1
                },
                new Service
                {
                    Id = 3,
                    name = "Lashes extension",
                    price = 35,
                    duration = 110,
                    description = "Lashes extension - 2D, 3D",
                    img = "https://publish.purewow.net/wp-content/uploads/sites/2/2022/02/types-of-eyelash-extensions.jpg?fit=728%2C524",
                    companyId = 1
                },
                new Service
                {
                    Id = 4,
                    name = "Hand massage",
                    price = 15,
                    duration = 20,
                    description = "Hand massage",
                    img = "https://opt.toiimg.com/recuperator/img/toi/m-75196048/75196048.jpg&width=500&resizemode=4",
                    companyId = 2
                },
                new Service
                {
                    Id = 5,
                    name = "Body massage",
                    price = 50,
                    duration = 60,
                    description = "Body massage",
                    img = "http://www.alexanderworks.org.uk/wp-content/uploads/2020/06/Body-Massage-at-Home.jpg",
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
                    gender = Gender.Female,
                    DoB = "1999-10-27T12:15:00.942Z",
                    img = "",
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
                    img = "https://localhost:8080/Uploads/UserImages/2/profileImage.png",
                    companyId = 1,
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
                    img = "",
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
                    img = "",
                    companyId = 2,
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
                    img = "",
                    companyId = 1,
                  
                },
                new User
                {
                    Id = 6,
                    login = "MassageSalon@gmail.com",
                    name = "MassageSalonAdmin",
                    password = "fKHdCVgwViFR1Cj7ANzZtlrO1zzGZLwK9eKQmM3eXes=",
                    role = Role.ADMIN,
                    DoB = "1989-10-27T12:15:00.942Z",
                    img = "",
                    companyId = 2
                }
                
            );
               
            mb.UseIdentityColumns();
        }
       

    }
}
