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
using System.Reflection;
using BackEnd.DTO;

namespace server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public partial class UserController : ControllerBase {

        private readonly DataContext _context;
        private IConfiguration _config;
        public static IWebHostEnvironment _environment;

        public UserController(IConfiguration config, DataContext context, IWebHostEnvironment environment) {
            _context = context;
            _config = config;
            _environment = environment;
        }
        public class FileUploadAPI : User{
             public List<IFormFile>? files {get;set;}
       
        }
        private string PostFile(int? userId, [FromForm]IFormFile objFile){
            string Filepath = string.Empty;
            try {
                    if (!System.IO.Directory.Exists(_environment.WebRootPath +"\\Uploads\\UserProfileImages\\"))
                    {
                        System.IO.Directory.CreateDirectory(_environment.WebRootPath +"\\Uploads\\UserProfileImages\\");
                    }
              
                 Filepath = _environment.WebRootPath +"\\Uploads\\UserProfileImages\\" + objFile.FileName;
                
            


                using (FileStream stream = System.IO.File.Create(Filepath))
                {
                    objFile.CopyTo(stream);
                    stream.Flush();
                    var req = Request;
                    return "/Uploads/UserProfileImages/" + objFile.FileName;
                }
            
        }
        catch (Exception ex) {}
            return "/Uploads/Noimage.png";
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var dbUser = _context.Users!.Include(u => u.Company).FirstOrDefault(user => (user.login == login.login && user.role == Role.ADMIN) || (user.login == login.login && user.companyId == login.companyId));
            if (dbUser == null) return NotFound();
            
            var test = HashPassword(login.password);
            if (dbUser.password != HashPassword(login.password)) return Unauthorized();
            var tokenData = new UserToken() {
                id = dbUser.Id,
                companyAlias = dbUser.Company.companyAlias,
                companyId = dbUser.companyId,
                email = dbUser.login,
                companyName = dbUser.Company.companyName,
                img = "https://" + Request.Host + dbUser.img,
                name = $"{dbUser.name} {dbUser.surname}",
                role = dbUser.role 
            };
            var token = GenerateJSONWebToken(tokenData);

            return Ok(new {token = token});
        }

        [HttpPost("reg-client")]
        public ActionResult<User> RegistrateClient([FromBody] User user) {
            if(_context.Users.Any(u => u.login == user.login && u.companyId == user.companyId)) {
                return BadRequest("This user is already registred");
            }

            var newUser = new User() {
                Id = 0,
                login = user.login,
                password = HashPassword(user.password),
                companyId = user.companyId,
                role = Role.CLIENT,
                img = "/Uploads/Noimage.png"
            };

            _context.Users!.Add(newUser);
            _context.SaveChanges();

            var dbClient = _context.Users.Include(u => u.Company).First(c => c.login == user.login && c.companyId== user.companyId);
            var userToken = new UserToken() {
                id = dbClient.Id,
                companyAlias = dbClient?.Company?.companyAlias ?? "",
                companyId = dbClient?.companyId,
                email = dbClient?.login,
                companyName = dbClient?.Company?.companyName,
                img = "https://" + Request.Host + dbClient.img,
                name = $"Unknown",
                role = dbClient?.role ?? Role.CLIENT 
            };
            var token = GenerateJSONWebToken(userToken);
            return Ok(new { token = token});
        }
        [HttpPost("reg-company")]
        public ActionResult<User> RegistrateCompany([FromBody] RegCompanyDTO company) {
            if(UserExists(null, company.username) && _context.Companies.Any(x => x.companyName == company.companyName) ||  _context.Companies.Any(x => x.companyAlias == company.companyAlias)) {
                return BadRequest("This user is already registred");
            }

            var companyData = new Company() {
                Id = 0,
                companyAlias = company.companyAlias,
                companyName = company.companyName,
            };
            
            
            _context.Companies!.Add(companyData);
            _context.SaveChanges();

            var dbCompany = _context.Companies.First(c => c.companyAlias == companyData.companyAlias && c.address == companyData.address && c.companyName == companyData.companyName);

            var userData = new User() {
                Id = 0,
                img =  dbCompany.img,
                login = company.username,
                password = HashPassword(company.password),
                companyId = dbCompany.Id,
                role = Role.ADMIN
            };
            _context.Users!.Add(userData);
            _context.SaveChanges();

            var token = GenerateJSONWebToken(new UserToken() {
                id = userData.Id,
                companyAlias = company.companyAlias,
                companyId = userData.companyId,
                email = userData.login,
                companyName = company.companyName,
                img = "https://" + Request.Host + userData.img,
                name = company.companyName,
                role = userData.role 
            });
            return Ok(new { token = token });
        }
        
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<FileUploadAPI> getUser(int id) {
            var user = _context.Users?.Include(u => u.Company).FirstOrDefault(u => u.Id == id);
            
            if(user == null)  return BadRequest("This user is not exists");


            user.img = "https://" + Request.Host + user.img;
            return Ok(user);
        }
        //  [Authorize]
        // !!!! This EndPoint must be in CompanyController
        [HttpGet("company/{companyId}/{role}")]
        public ActionResult<User> getCompanyUsersByRole(int companyId, Role role) {
            var users = _context.Users?.Where(u => u.companyId == companyId && u.role == role);

            return Ok(users);
        }

        [Authorize]
        [HttpPost("{id}/post-photo")]
        public ActionResult<FileUploadAPI> uploadUserPhoto(int id, [FromForm] List<IFormFile> files) {
            if(files.Count() > 0) {
                var photoPath = PostFile(id, files.ElementAt(0));
                return Ok(photoPath);
            }
            return BadRequest();
        }
        [Authorize]
        [HttpPut("{id}")]
        public ActionResult<FileUploadAPI> updateUser(int id, [FromBody] User user) {
            if (id != user.Id) {
                return BadRequest();
            }

            if (!UserExists(user.Id, user.login)) {
                return NotFound();
        }
            if(user.img == null){
                 var oldUser = _context.Users.Find(id);
               user.img =  oldUser.img;
              _context.ChangeTracker.Clear();
            }
      

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return CreatedAtAction(nameof(getUser), new { id = user.Id}, user);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult<User> deleteUser(int id) {
            
            var user = _context.Users!.First(u => u.Id == id);
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
        private string  GetCompanyId(){
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity.FindFirst("companyId")!.Value;
        }

        private string GenerateJSONWebToken(UserToken user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>();

            foreach(var keyPair in DictionaryFromType(user)) {
                claims.Add(new Claim(keyPair.Key.ToString(), keyPair.Value?.ToString() ?? ""));
            }

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool UserExists(int? id, string? login = null) {
            return _context.Users!.Any(u => (id != null && u.Id == id) || (login != null && u.login == login));
        }

        private static Dictionary<string, object> DictionaryFromType(object atype) {
            if (atype == null) return new Dictionary<string, object>();
            Type t = atype.GetType();
            PropertyInfo[] props = t.GetProperties();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            foreach (PropertyInfo prp in props)
            {
                object value = prp.GetValue(atype, new object[]{});
                dict.Add(prp.Name, value);
            }
            return dict;
}
    }
}