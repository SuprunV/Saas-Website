using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Enums;
using server.Models;

namespace server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {

        private readonly DataContext _context;

        public UserController(DataContext context) {
            _context = context;
        }

        [HttpPost("reg")]
        public ActionResult<User> CreateUser([FromBody] User user) {
            if(UserExists(null, user.login)) {
                return BadRequest("This user is already registred");
            }

            _context.Users!.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(getUser), new { id = user.Id }, user);
        }
        [HttpGet("{id}")]
        public ActionResult<User> getUser(int id) {
            var user = _context.Users?.FirstOrDefault(u => u.Id == id);
            
            if(user == null)  return BadRequest("This user is not exists");
    
            return Ok(user);
        }
        // !!!! This EndPoint must be in CompanyController
        [HttpGet("company/{companyId}/{role}")]
        public ActionResult<User> getCompanyUsersByRole(int companyId, Role role) {
            var users = _context.Users?.Where(u => u.companyId == companyId && u.role == role);

            return Ok(users);
        }
        // !!!!
        [HttpPut("{id}")]
        public ActionResult<User> updateUser(int id, [FromBody] User user) {
            if (id != user.Id) {
                return BadRequest();
            }

            if (!UserExists(user.Id, user.login)) {
                return NotFound();
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return CreatedAtAction(nameof(getUser), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public ActionResult<User> deleteUser(int id) {
            
            var user = _context.Users!.Find(id);
            if (user == null) {
                return NotFound();
            }

            _context.Users!.Remove(user);
            _context.SaveChanges();

            return Ok();
        }

        private bool UserExists(int? id, string? login = null) {
            return _context.Users!.Any(u => (id != null && u.Id == id) || (login != null && u.login == login));
        }
    }
}