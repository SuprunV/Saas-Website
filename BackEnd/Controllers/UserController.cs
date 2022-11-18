using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Enums;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using server.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace server.Controllers {
 
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {

        private readonly DataContext _context;
        private IConfiguration _config;

        public UserController(IConfiguration config, DataContext context) {
            _context = context;
            _config = config;
        }
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var dbUser = _context.Users!.Include(u => u.Company).FirstOrDefault(user => user.login == login.login);
            if (dbUser == null) return NotFound();
            
            var test = HashPassword(login.password);
            if (dbUser.password != HashPassword(login.password)) return Unauthorized();
            var tokenData = new UserToken() {
                id = dbUser.Id,
                companyAlias = dbUser.Company.companyAlias,
                companyId = dbUser.companyId,
                email = dbUser.login,
                companyName = dbUser.Company.companyName,
                img = dbUser.img,
                name = $"{dbUser.name} {dbUser.surname}",
                role = dbUser.role 
            };
            var token = GenerateJSONWebToken(tokenData);

            return Ok(new {token = token});
        }

        [HttpPost("reg")]
        public ActionResult<User> CreateUser([FromBody] User user) {
            if(UserExists(null, user.login)) {
                return BadRequest("This user is already registred");
            }

            _context.Users!.Add(user);
            _context.SaveChanges();

            var token = GenerateJSONWebToken(new UserToken() {
                id = user.Id,
                companyAlias = user.Company.companyAlias,
                companyId = user.companyId,
                email = user.login,
                companyName = user.Company.companyName,
                img = user.img,
                name = "Unknown Unknown",
                role = user.role 
            });
            return CreatedAtAction(nameof(getUser), new { id = user.Id, token = token}, user);
        }
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<User> getUser(int id) {
            var user = _context.Users?.FirstOrDefault(u => u.Id == id);
            
            if(user == null)  return BadRequest("This user is not exists");
    
            return Ok(user);
        }
         [Authorize]
        // !!!! This EndPoint must be in CompanyController
        [HttpGet("company/{companyId}/{role}")]
        public ActionResult<User> getCompanyUsersByRole(int companyId, Role role) {
            var users = _context.Users?.Where(u => u.companyId == companyId && u.role == role);

            return Ok(users);
        }
        [Authorize]
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
        [Authorize]
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
        private string HashPassword(string password)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: new byte[0],
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
        private string GetRole()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity.FindFirst("roleId")!.Value;
        }
             private string  GetCompanyId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity.FindFirst("companyId")!.Value;
        }

        private string GenerateJSONWebToken(UserToken user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              new List<Claim> { new Claim("roleId", user.role.ToString(),"companyId",user.companyId.ToString())},
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool UserExists(int? id, string? login = null) {
            return _context.Users!.Any(u => (id != null && u.Id == id) || (login != null && u.login == login));
        }
    }
}