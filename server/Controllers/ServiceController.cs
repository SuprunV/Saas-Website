using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;

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

        [HttpGet]
        public ActionResult<IEnumerable<Service>> GetServices(int companyId) {
            var service = _context.Services!.Where(x => x.companyId == companyId);

            // if (service == null) {
            //     return NotFound();
            // }

            return Ok(service);
        }
        [HttpGet("{serviceId}")]
        public ActionResult<Service> GetService(int serviceId)
        {
            var service = _context.Services!.Find(serviceId);

            if (service == null)
            {
                return NotFound();
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

            return Ok(companyServices.Count);
        }

        [HttpGet("{companyId}/services")]
        public ActionResult<IEnumerable<Service>> GetCompanyServices(int companyId)
        {
            var companyServices = _context.Companies!
            .Include(x => x.CompanyServices)
            .First(x => x.Id == companyId)
            .CompanyServices;

            return Ok(companyServices);
        }

        [HttpPost]
        public ActionResult<Service> CreateService(Service service)
        {
            if(_context.Services!.Any(x => x.name == service.name))
            {
                return BadRequest();
            }

            _context.Services!.Add(service);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
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
                return NotFound();
            }

            _context.Entry(service).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }
        
        [HttpDelete("{serviceId}")]
        public ActionResult<Service> DeleteService(int serviceId)
        {
            if (!ServiceExists(serviceId))
            {
                return NotFound();
            }

            var service = _context.Services!.Find(serviceId);
            _context.Services!.Remove(service);
            _context.SaveChanges();

            return service;
        }

        private bool ServiceExists(int id)
        {
            return _context.Services!.Any(c => c.Id == id);
        }
    }
}