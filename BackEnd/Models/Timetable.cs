using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using server.Enums;

namespace server.Models
{
    public class Timetable {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? companyId { get; set; }
        public string? startTime {get; set;} 
        public string? endTime {get; set;} 
        public Weekday weekday {get; set; }
        [JsonIgnore]
        public virtual ICollection<User> CompanyUsers { get; set; } = new List<User>();
        [JsonIgnore]
        public virtual ICollection<Service> CompanyServices { get; set; } = new List<Service>();
    }

}