using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController: ControllerBase
    {
        private readonly DataContext _context;
        public CompanyController(DataContext context)
        {
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
        [HttpGet("CompaniesCount")]
        public ActionResult<int> GetCompaniesCount()
        {
            var company = _context.Companies!
            .ToList();

            return Ok(company.Count);
        }
        
        [HttpGet("{companyId}/AllClientsInCompany")]
        public ActionResult<int> GetCompanyClients(int companyId)
        {
            var clientsInCompany = _context.Clients?.Where(x => x.User.companyId == companyId);
            if(clientsInCompany == null) return Ok("No clients in company");
            else return Ok(clientsInCompany?.ToList());
        }
          [HttpGet("{companyId}/AllMastersInCompany")]
        public ActionResult<int> GetCompanyMasters(int companyId)
        {
            var mastersInCompany = _context.Masters?.Where(x => x.User.companyId == companyId);
            if(mastersInCompany == null) return Ok("No masters in company");
            else return Ok(mastersInCompany?.ToList());
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
     
        private bool CompanyExists(int id)
        {
            return _context.Companies!.Any(c => c.Id == id);
        }
    }
}