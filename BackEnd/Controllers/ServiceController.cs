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
        public static IWebHostEnvironment _environment;

        public ServiceController(DataContext context, IWebHostEnvironment environment)
        {
            _context = context;
             _environment = environment;
        }
        public class FileUploadAPI : Service{
        public List<IFormFile>? files {get;set;}
       
        }
        private string PostFile(int? userId, [FromForm]IFormFile objFile){
            string Filepath = string.Empty;
            try {
                    if (!System.IO.Directory.Exists(_environment.WebRootPath +"\\Uploads\\ServiceImages\\"))
                    {
                        System.IO.Directory.CreateDirectory(_environment.WebRootPath +"\\Uploads\\ServiceImages\\");
                    }
              
                 Filepath = _environment.WebRootPath +"\\Uploads\\ServiceImages\\" + objFile.FileName;

                using (FileStream stream = System.IO.File.Create(Filepath))
                {
                    objFile.CopyTo(stream);
                    stream.Flush();
                    var req = Request;
                    return "/Uploads/ServiceImages/" + objFile.FileName;
                }
            
        }
        catch (Exception ex) {}
            return "/Uploads/Noimage.png";
        }
        [HttpGet("{serviceId}")]
        public ActionResult<Service> GetService(int serviceId)
        {
            var service = _context.Services!.Find(serviceId);

            if (service == null)
            {
                return NotFound("No service with this id");
            }
            service.img = "https://" + Request.Host + service.img;
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
        [Authorize]
        [HttpPost("{id}/post-photo")]
        public ActionResult<FileUploadAPI> uploadServicePhoto(int id, [FromForm] List<IFormFile> files) {
            if(files.Count() > 0) {
                var photoPath = PostFile(id, files.ElementAt(0));
                return Ok(photoPath);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public ActionResult<FileUploadAPI> UpdateService(int id, [FromBody] Service service)
        {
            if (id != service.Id)
            {
                return BadRequest();
            }

            if (!ServiceExists(id))
            {
                return NotFound("Service does not exist");
            }
            if(service.img == null){
                 var oldService = _context.Services.Find(id);
               service.img =  oldService.img;
              _context.ChangeTracker.Clear();
            }


            _context.Entry(service).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(service);
        }
        
        [HttpDelete("{serviceId}")]
        public ActionResult<Service> DeleteService(int serviceId)
        {
            var service = _context.Services!.First(u => u.Id == serviceId);
            var appointments = _context.Appointments!.Where(x=>x.serviceId == serviceId);

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