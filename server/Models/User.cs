using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using server.Enums;

namespace server.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string? login { get; set; }
        public string? password { get; set; }
        public Role role { get; set; }
        public string? img { get; set; }
        
        public Guid? companyId { get; set; }
  
        [JsonIgnore]
        public virtual Company? Company { get; set; }
        [JsonIgnore]
        public virtual ICollection<Company> Companies { get; set; } = new List<Company>();
        [JsonIgnore]
        public virtual ICollection<Master> Masters { get; set; } = new List<Master>();
        [JsonIgnore]
        public virtual ICollection<Client> Clients { get; set; } = new List<Client>();
    }
}