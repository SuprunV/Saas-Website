using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;
using Microsoft.AspNetCore.Authorization;
using server.Enums;

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class ClientController:ControllerBase
    {
        private readonly DataContext _context;
        public ClientController(DataContext context) {
            _context = context;
        }
        
        [HttpGet("GetAppClientsCount")]
        public ActionResult<Client> GetAppClientsCount()
        {
            var clients = _context.Clients!;
            if (clients == null)
            {
                return NotFound();
            }
            return Ok(clients.Count());
        }
        
        [HttpGet("GetCompanyClientsCount/{companyId}")]
        public ActionResult<Client> GetCompanyClientsCount(int companyId)
        {
            var clients = _context.Clients!.Where(x=>x.User.companyId == companyId);
            if (clients == null)
            {
                return NotFound();
            }
            return Ok(clients.Count());
        }
        [HttpGet("{id}")]
        public ActionResult<Client> GetClient(int id) {
            var client = _context.Clients?.FirstOrDefault(c => c.Id == id);
            
            if(client == null)  return BadRequest("This client is not exists");
    
            return Ok(client);
        }
        [HttpPut("{id}")]
        public ActionResult<Client> UpdateClient(int id, [FromBody] Client client) {
            if (id != client.Id) {
                return BadRequest();
            }

            if (!ClientExists(client.Id)) {
                return NotFound();
            }

            _context.Entry(client).State = EntityState.Modified;
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }
        [HttpDelete("{id}")]
        public ActionResult<Client> DeleteClient(int id) {
            
            var client = _context.Clients!.Find(id);
            var user = _context.Users!.Find(client!.userId);
            var appointments = _context.Appointments!.Where(x=>x.clientId == id);
            if (client == null) {
                return NotFound();
            }
            _context.Appointments!.RemoveRange(appointments);
            _context.Users!.Remove(user!);
            _context.Clients!.Remove(client);
            _context.SaveChanges();

            return Ok();
        }
        
        [HttpPost("reg")]
        public ActionResult<Client> CreateClient([FromBody] Client client) {
            var users = _context.Users!;
            var clientsExisted = _context.Clients!;
            
            if(ClientExists(client.Id)) {
                return BadRequest("This client is already registred");
            }
            if(clientsExisted.Any(x=>x.userId == client.userId)) {
                return BadRequest("This user is already registred");
            }
           try{var check = users.First(x=>x.Id == client.userId).Id; }
           catch (System.Exception) {return BadRequest($"The user with id: {client.userId} has not registred yet"); }
           
            if(Role.Client != users.First(x=>x.Id == client.userId).role ){
                return BadRequest($"The user with id: {client.userId} has not registred with client role yet");
            }
            _context.Clients!.Add(client);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetClient), new { id = client.Id}, client);
        }
        private IQueryable<User>? GetCompanyUsers(int companyId){
            var users = _context.Users?.Where(x=>x.companyId == companyId);
            return users;
        }
        private bool ClientExists(int id)
        {
            return _context.Clients!.Any(c => c.Id == id);
        }
        
    }
}