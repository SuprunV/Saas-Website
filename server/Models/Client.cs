using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using server.Enums;

namespace server.Models
{
    public class Client
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string? name { get; set; }
        public string? surname { get; set; }
        public string? DoB { get; set; }
        public Gender gender { get; set; }
        
        public Guid? userId { get; set; }
  
        [JsonIgnore]
        public virtual User? User { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Appointment> AppointmentClient { get; set; } = new List<Appointment>();
     
    }
}