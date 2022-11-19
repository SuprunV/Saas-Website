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
        public CompanyController(DataContext context) {
            _context = context;
        }
        [HttpGet("{companyId}")]
        public ActionResult<Company> GetCompany(int companyId)
        {
            var company = _context.Companies!.Find(companyId);

            if (company == null)
            {
                return NotFound("Provided company does not exist");
            }

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
            var clientsInCompany = _context.Clients?.Where(x => x.User.companyId == companyId);
            if(clientsInCompany == null) return Ok("No clients in company");
            else return Ok(clientsInCompany?.ToList());
        }
        [HttpGet("{companyId}/appointments")]
        public ActionResult<IEnumerable<Appointment>> GetCompanyAppointmentsByDate(int companyId, [FromQuery] string date)
        {
            if(!CompanyExists(companyId)) return BadRequest();
            var appointments = _context.Appointments!.Include(x => x.Master).Where((x => x.date.Contains(date) && x.Master.User.companyId == companyId));
            return Ok(appointments);
        }
        [HttpGet("{companyId}/free-appointments")]
        public ActionResult<IEnumerable<Appointment>> GetCompanyFreeAppointmentsByDate(int companyId, [FromQuery] string date, int serviceId)
        {
            if(!_context.Services!.Any(s => s.Id == serviceId)) return Conflict();
            if(!CompanyExists(companyId)) return BadRequest();
            var appointments = _context.Appointments!.Include(x => x.Master).Include(x => x.Service).Where((x => x.date.Contains(date) && x.Master.User.companyId == companyId)).ToList();
            
            // masterId:
            // master
            // id: any
            // date: generated
            var timetable = generateTimeTable(8, 16, date);
            
            var serviceDuration = _context.Services!.First(s => s.Id == serviceId).duration ?? 0;
            var freeAppointments = new List<Appointment>();
            
            // get list of all masters in this company
            var masters = _context.Masters.Include(m => m.User).Where(m => m.User.companyId == companyId);
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
        public ActionResult<IEnumerable<Master>> GetCompanyMasters(int companyId)
        {
            if(!CompanyExists(companyId)) return BadRequest();
            var mastersInCompany = _context.Masters?.Where(x => x.User.companyId == companyId);
            
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
        [HttpPut("{companyId}")]
        public IActionResult UpdateCompany(int companyId, Company company)
        {
            if (companyId != company.Id)
            {
                return BadRequest();
            }

            if (!CompanyExists(companyId))
            {
                return NotFound();
            }

            _context.Entry(company).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(company);
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