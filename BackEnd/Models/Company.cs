using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Company
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? companyName { get; set; }
        public string? companyAlias { get; set; }
        public string? address { get; set; }
        public string? img { get; set; }

        [JsonIgnore]
        public virtual ICollection<User> CompanyUsers { get; set; } = new List<User>();
        [JsonIgnore]
        public virtual ICollection<Service> CompanyServices { get; set; } = new List<Service>();
     
    }
}