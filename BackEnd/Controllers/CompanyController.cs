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
            var timetable = generateTimeTable(8, 16, date);
            
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
              _context.ChangeTracker.Clear();
            }

            _context.Entry(company).State = EntityState.Modified;
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetCompany), new { companyId = company.Id}, company);
        }
         [Authorize]
        [HttpPut("{companyId}/timetables")]
        public ActionResult<FileUploadAPI> UpdateCompanyTimetables(int companyId, [FromBody] Timetable[] timetables)
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

        private List<DateTime> generateTimeTable(int start, int end, string dateDays) {
            var timetable = new List<DateTime>();
            var date = DateTime.Parse(dateDays);
            for(var h = start; h <= end; h++) {
                for(var m = 0; m < 2; m++) {
                    var time = new DateTime(date.Year, date.Month, date.Day, h,m*30,0);
                    timetable.Add(TimeZoneInfo.ConvertTimeToUtc(time));
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