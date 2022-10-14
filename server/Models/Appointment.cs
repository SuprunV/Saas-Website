using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Appointment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string? DoB { get; set; }

        public Guid? clientId { get; set; }
        public Guid? serviceId { get; set; }
        public Guid? masterId { get; set; }

  
        [JsonIgnore]
        public virtual Client? Client { get; set; }
        
        [JsonIgnore]
        public virtual Service? Service { get; set; }

        [JsonIgnore]
        public virtual Master? Master { get; set; }
    }
}