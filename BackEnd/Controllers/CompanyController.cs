using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;
using Microsoft.AspNetCore.Authorization;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController: ControllerBase
    {
        private readonly DataContext _context;
        public static IWebHostEnvironment _environment;
        public CompanyController(DataContext context, IWebHostEnvironment environment) {
            _context = context;
            _environment = environment;
        }
        public class FileUploadAPI : Company{
        public List<IFormFile>? files {get;set;}
       
        }
        private string PostFile(int? userId, [FromForm]IFormFile objFile){
            string Filepath = string.Empty;
            try {
                    if (!System.IO.Directory.Exists(_environment.WebRootPath +"\\Uploads\\CompanyProfileImages\\"))
                    {
                        System.IO.Directory.CreateDirectory(_environment.WebRootPath +"\\Uploads\\CompanyProfileImages\\");
                    }
              
                 Filepath = _environment.WebRootPath +"\\Uploads\\CompanyProfileImages\\" + objFile.FileName;

                using (FileStream stream = System.IO.File.Create(Filepath))
                {
                    objFile.CopyTo(stream);
                    stream.Flush();
                    var req = Request;
                    return "/Uploads/CompanyProfileImages/" + objFile.FileName;
                }
            
        }
        catch (Exception ex) {}
            return "/Uploads/Noimage.png";
        }

        [HttpGet]
        public ActionResult<Company> GetPublicCompanies()
        {
            var companies = _context.Companies!;

            return Ok(companies);
        }

        [HttpGet("{companyId}")]
        public ActionResult<Company> GetCompany(int companyId)
        {
            var company = _context.Companies!.Find(companyId);

            if (company == null)
            {
                return NotFound("Provided company does not exist");
            }
            company.img = "https://" + Request.Host + company.img;
            return Ok(company);
        }

        [HttpGet("alias-{companyAlias}")]
        public ActionResult<Company> GetCompany(string companyAlias)
        {
            var company = _context.Companies!.First(c => c.companyAlias == companyAlias);

            if (company == null)
            {
                return NotFound("Provided company does not exist");
            }
            company.img = "https://" + Request.Host + company.img;
            return Ok(company);
        }

        [HttpGet("count")]
        public ActionResult<int> GetCompaniesCount()
        {
            var company = _context.Companies!
            .ToList();

            return Ok(company.Count);
        }
        
        [HttpGet("{companyId}/clients")]
        public ActionResult<int> GetCompanyClients(int companyId)
        {
            var clientsInCompany = _context.Users?.Where(x => x.companyId == companyId && x.role == Enums.Role.CLIENT);
            if(clientsInCompany == null) return Ok("No clients in company");
            else return Ok(clientsInCompany?.ToList());
        }

        [HttpGet("alias-{companyAlias}/clients")]
        public ActionResult<IEnumerable<User>> GetCompanyClients(string companyAlias)
        {
            if(!_context.Companies!.Any(c => c.companyAlias == companyAlias)) return BadRequest();

            var companyClients = _context.Users!.Include(x => x.Company).Where(s => s.Company.companyAlias == companyAlias && s.role == Enums.Role.CLIENT);
            
            return Ok(companyClients);
        }

        [HttpGet("alias-{companyAlias}/clientsCount")]
        public ActionResult<int> GetCompanyClientsCount(string companyAlias)
        {
            if(!_context.Companies!.Any(c => c.companyAlias == companyAlias)) return BadRequest();

            var companyClients = _context.Users!.Include(x => x.Company).Where(s => s.Company.companyAlias == companyAlias && s.role == Enums.Role.CLIENT).ToList();
            
            return Ok(companyClients.Count);
        }

        [HttpGet("{companyId}/appointments")]
        public ActionResult<IEnumerable<Appointment>> GetCompanyAppointmentsByDate(int companyId, [FromQuery] string date)
        {
            if(!CompanyExists(companyId)) return BadRequest();
            var appointments = _context.Appointments!.Include(x => x.Master).Where((x => x.date.Contains(date) && x.Master.companyId == companyId));
            return Ok(appointments);
        }
        [HttpGet("{companyId}/free-appointments")]
        public ActionResult<IEnumerable<Appointment>> GetCompanyFreeAppointmentsByDate(int companyId, [FromQuery] string date, int serviceId)
        {
            if(!_context.Services!.Any(s => s.Id == serviceId)) return Conflict();
            if(!CompanyExists(companyId)) return BadRequest();

            var serviceMasters = _context.ServiceMaster.Where(sm => sm.serviceId == serviceId).Select(sm => sm.masterId);
            var appointments = _context.Appointments!.Include(x => x.Master).Include(x => x.Service).Where((x => x.date.Contains(date) && x.Master.companyId == companyId && serviceMasters.Contains(x.Master.Id))).ToList();
            
            // masterId:
            // master
            // id: any
            // date: generated
            var weekday = (int)DateTime.Parse(date).DayOfWeek;
            var dbTimetable = _context.Timetables.FirstOrDefault(t => t.companyId == companyId && (int)t.weekday == weekday);
            if(dbTimetable == null) return Ok(new List<Appointment>());
            var startTime = dbTimetable.startTime.Split(":");
            var endTime = dbTimetable.endTime.Split(":");
            var timetable = generateTimeTable(startTime, endTime, date);
            
            var serviceDuration = _context.Services!.First(s => s.Id == serviceId).duration ?? 0;
            var freeAppointments = new List<Appointment>();
            
            // get list of all masters in this company
            var masters = _context.Users.Where(m => m.companyId == companyId && m.role == Enums.Role.MASTER && serviceMasters.Contains(m.Id));
            foreach(var master in masters) {
                // get buzy appointments of this master.
                var buzyAppointments = appointments.Where(a => a.masterId == master.Id);
                if(buzyAppointments != null) {
                    // Example: we have buzy times: 10:15 + 60 and 15:30 + 45.
                    var buzyTimeEndings = new List<List<DateTime>>();
                    foreach(var appointment in buzyAppointments) {
                        var dateStart = TimeZoneInfo.ConvertTimeToUtc(DateTime.Parse(appointment.date)); 
                        buzyTimeEndings.Add(new List<DateTime>(){dateStart.AddMinutes(-serviceDuration), dateStart.AddMinutes(appointment.Service.duration ?? 0)});
                    }

                    var freeTimes = timetable.Where(controlTime => !buzyTimeEndings.Any(buzyTime => controlTime >= buzyTime[0] && controlTime <= buzyTime[1]));
                    
                    foreach(var freeTime in freeTimes) {
                        freeAppointments.Add(new Appointment() {
                            masterId = master.Id,
                            Master =  master,
                            serviceId = serviceId,
                            date = freeTime.ToString("o")
                        });
                    }
                }

            }
            return Ok(freeAppointments);
        }
        
        [HttpGet("{companyId}/masters")]
        public ActionResult<IEnumerable<User>> GetCompanyMasters(int companyId)
        {
            if(!CompanyExists(companyId)) return BadRequest();
            var mastersInCompany = _context.Users?.Where(x => x.companyId == companyId && x.role == Enums.Role.MASTER);
            
            return Ok(mastersInCompany);
        }
        [HttpGet("alias-{companyAlias}/masters")]
        public ActionResult<IEnumerable<User>> GetCompanyMasters(string companyAlias)
        {
            if(!_context.Companies!.Any(c => c.companyAlias == companyAlias)) return BadRequest();

            var mastersInCompany = _context.Users!.Include(x => x.Company).Where(s => s.Company.companyAlias == companyAlias && s.role == Enums.Role.MASTER);
            foreach (User master in mastersInCompany)
            {
                master.img = "https://" + Request.Host + master.img;
            }
            
            return Ok(mastersInCompany);
        }

        [HttpGet("alias-{companyAlias}/mastersCount")]
        public ActionResult<int> GetCompanyMastersCount(string companyAlias)
        {
            if(!_context.Companies!.Any(c => c.companyAlias == companyAlias)) return BadRequest();

            var mastersInCompany = _context.Users!.Include(x => x.Company).Where(s => s.Company.companyAlias == companyAlias && s.role == Enums.Role.MASTER).ToList();
            
            return Ok(mastersInCompany.Count);
        }
        
        [HttpGet("{companyId}/services")]
        public ActionResult<IEnumerable<Service>> GetCompanyServices(int companyId) {
            if(!CompanyExists(companyId)) return BadRequest();

            var services = _context.Services!.Where(s => s.companyId == companyId);

            return Ok(services);
        }
        
        [HttpGet("alias-{companyAlias}/services")]
        public ActionResult<IEnumerable<Service>> GetCompanyServices(string companyAlias) {
            if(!_context.Companies!.Any(c => c.companyAlias == companyAlias)) return BadRequest();

            var services = _context.Services!.Include(x => x.Company).Where(s => s.Company.companyAlias == companyAlias);

            return Ok(services);
        }
        [HttpGet("alias-{companyAlias}/servicesCount")]
        public ActionResult<int> GetCompanyServicesCount(string companyAlias) {
            if(!_context.Companies!.Any(c => c.companyAlias == companyAlias)) return BadRequest();

            var services = _context.Services!.Include(x => x.Company).Where(s => s.Company.companyAlias == companyAlias).ToList();

            return Ok(services.Count);
        }

        [HttpGet("alias-{companyAlias}/companyIncome")]
        public ActionResult<decimal> GetCompanyDoneAppointmentsCount(string companyAlias){
         var  masters = _context.Users!.Include(x => x.Company).Where(m => m.Company.companyAlias == companyAlias && m.role == Enums.Role.MASTER).Select(x => x.Id).ToList();
      
          var appointments = _context.Appointments!.Include(x => x.Service).Where(x => masters.Contains(x.masterId));  
          decimal companyIncome = 0;
        foreach(var a in appointments) 
        {
            if(DateTime.Parse(a.date) < DateTime.Now) {
                var price = a.Service?.price ?? 0;
                companyIncome = companyIncome + price;
            }
        }

         return Ok(companyIncome);
        }

        [HttpPost]
        public ActionResult<Company> CreateCompany([FromBody] Company company) {
            var dbCompany = _context.Companies!.Find(company.Id);
            if (dbCompany == null)
            {
                 _context.Companies!.Add(company);
                _context.SaveChanges();

                return Ok( company);
            }

            if(_context.Companies!.Any(x => x.companyName == company.companyName))
            {
                return BadRequest("Company already exists with the same name");
            }
            if(CompanyExists(company.Id))
            {
                return Conflict("Company already exists with the same id");
            }
            else{
                return BadRequest();
            }
            
            
        }
        [Authorize]
        [HttpPost("{id}/post-photo")]
        public ActionResult<FileUploadAPI> uploadCompanyPhoto(int id, [FromForm] List<IFormFile> files) {
            if(files.Count() > 0) {
                var photoPath = PostFile(id, files.ElementAt(0));
                return Ok(photoPath);
            }
            return BadRequest();
        }


        [Authorize]
        [HttpPut("{companyId}")]
        public ActionResult<FileUploadAPI> UpdateCompany(int companyId, [FromBody] Company company)
        {
            var admin = _context.Users!.First(x=>x.companyId == companyId && x.role == Enums.Role.ADMIN);
            if (companyId != company.Id)
            {
                return BadRequest();
            }

            if (!CompanyExists(companyId))
            {
                return NotFound();
            }
            if(company.img == null){
                 var oldCompany = _context.Companies.Find(companyId);
               company.img =  oldCompany.img;
               admin.img = oldCompany.img;
              _context.ChangeTracker.Clear();
            }
            admin.img = company.img;
            _context.Entry(company).State = EntityState.Modified;
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetCompany), new { companyId = company.Id}, company);
        }
        [Authorize]
        [HttpPut("{companyId}/timetables")]
        public ActionResult UpdateCompanyTimetables(int companyId, [FromBody] Timetable[] timetables)
        {
            if (timetables.Any(t => t.companyId != companyId)) {
                return BadRequest("Incorrect timetables");
            }
            if (!CompanyExists(companyId)) {
                return NotFound("Company doesn't exists");
            }

            var oldTimetables = _context.Timetables.Where(t => t.companyId == companyId);
            _context.Timetables.RemoveRange(oldTimetables);
            _context.SaveChanges();

            _context.Timetables.AddRange(timetables);
            _context.SaveChanges();

            return Ok();
        }
        
        [Authorize]
        [HttpGet("{companyId}/timetables")]
        public ActionResult<List<Timetable>> GetCompanyTimetables(int companyId)
        {
            if (!CompanyExists(companyId)) {
                return NotFound("Company doesn't exists");
            }
            var timetables = _context.Timetables.Where(t => t.companyId == companyId);

            return Ok(timetables);
        }

        [Authorize]
        [HttpDelete("{companyId}")]
        public ActionResult<Company> DeleteCompany(int companyId)
        {
            if (!CompanyExists(companyId))
            {
                return NotFound();
            }

            var company = _context.Companies!.Find(companyId);
            var  user = new User();
            try{
             user = _context.Users?.First(x=>x.companyId == companyId);
            }
            catch{
                _context.Companies!.Remove(company);
                 _context.SaveChanges();
                 return company;
            }
            _context.Users!.Remove(user);
            _context.Companies!.Remove(company);
            _context.SaveChanges();

            return company;
        }

        private List<DateTime> generateTimeTable(string[] start, string[] end, string dateDays) {
            var startHour = Int16.Parse(start[0]);
            var startMin = Int16.Parse(start[1]);
            var endHour = Int16.Parse(end[0]);
            var endMin = Int16.Parse(end[1]);
            var timetable = new List<DateTime>();
            var date = DateTime.Parse(dateDays);
            var step = 30;
            for(var h = startHour; h <= endHour; h++) {
                for(var m = 0; m < 2; m++) {
                    int? minute = null;
                    
                    if(h == startHour) {
                        if(m * step >= startMin) {
                            minute = m * step;
                        }
                    } else if(h == endHour) {
                        if(m * step <= endMin) {
                            minute = m * step;
                        }
                    } else {
                        minute = m * step;
                    }
                    if(minute != null) {
                        var time = new DateTime(date.Year, date.Month, date.Day, h, (int)minute,0);
                        timetable.Add(TimeZoneInfo.ConvertTimeToUtc(time));
                    }

                }
            }

            return timetable;

            
        }
        private bool CompanyExists(int id)
        {
            return _context.Companies!.Any(c => c.Id == id);
        }
    }
}