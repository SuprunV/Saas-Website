using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Service
    {
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string? name { get; set; }
        public decimal? price { get; set; }
        public int? duration { get; set; }
        public string? description { get; set; }
        public string? img { get; set; }
        
        public Guid? companyId { get; set; }
  
        [JsonIgnore]
        public virtual Company? Company { get; set; }
        [JsonIgnore]
        public virtual ICollection<Appointment> AppointmentService { get; set; } = new List<Appointment>();
        
    }
}