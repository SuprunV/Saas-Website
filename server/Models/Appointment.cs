using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Appointment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? date { get; set; }

        public int? clientId { get; set; }
        public int? serviceId { get; set; }
        public int masterId { get; set; }

  
        [JsonIgnore]
        public virtual Client? Client { get; set; }
        
        [JsonIgnore]
        public virtual Service? Service { get; set; }

        [JsonIgnore]
        public virtual Master? Master { get; set; }
    }
}
