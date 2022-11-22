using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;
using Microsoft.AspNetCore.Authorization;

namespace server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly DataContext _context;

        public ServiceController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{serviceId}")]
        public ActionResult<Service> GetService(int serviceId)
        {
            var service = _context.Services!.Find(serviceId);

            if (service == null)
            {
                return NotFound("No service with this id");
            }

            return Ok(service);
        }

        [HttpGet("{companyId}/servicecount")]
        public ActionResult<int> GetCompanyServiceCount(int companyId)
        {
            var companyServices = _context.Companies!
            .Include(x => x.CompanyServices)
            .First(x => x.Id == companyId)
            .CompanyServices;

            if(companyServices == null)
            {
                return NotFound("No services in this company");
            }

            return Ok(companyServices.Count);
        }

        [HttpGet("{companyId}/services")]
        public ActionResult<IEnumerable<Service>> GetCompanyServices(int companyId)
        {
            var companyServices = _context.Companies!
            .Include(x => x.CompanyServices)
            .First(x => x.Id == companyId)
            .CompanyServices;

            if(companyServices == null)
            {
                return NotFound("No services in this company");
            }

            return Ok(companyServices);
        }

        [HttpPost]
        public ActionResult<Service> CreateService(Service service)
        {
            if(_context.Services!.Any(x => x.name == service.name))
            {
                return BadRequest("This service already exists");
            }

            _context.Services!.Add(service);
            _context.SaveChanges();
            return Ok(service);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateService(int id, Service service)
        {
            if (id != service.Id)
            {
                return BadRequest();
            }

            if (!ServiceExists(id))
            {
                return NotFound("Service does not exist");
            }

            _context.Entry(service).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(service);
        }
        
        [HttpDelete("{serviceId}")]
        public ActionResult<Service> DeleteService(int serviceId)
        {
            var service = _context.Services!.First(u => u.Id == serviceId);
            var appointments = _context.Appointments!.Where(u => u.serviceId == serviceId);
            if (service == null)
            {
                return NotFound("Service does not exist");
            }
            _context.Appointments!.RemoveRange(appointments);
            _context.Services!.Remove(service);
            _context.SaveChanges();

            return Ok();
        }

        private bool ServiceExists(int id)
        {
            return _context.Services!.Any(c => c.Id == id);
        }
    }
}