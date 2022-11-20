using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Appointment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? date { get; set; }

        public string? clientName {get; set;}
        public string? clientEmail {get; set;}
        public int? serviceId { get; set; }
        public int masterId { get; set; }
        public int? clientId { get; set; }

  
        // [JsonIgnore]
        public virtual Service? Service { get; set; }
   
        // [JsonIgnore]
        public virtual User? MasterUser { get; set; }

        // [JsonIgnore]
        public virtual User? ClientUser { get; set; }
    }
}
