using System.Text.Json.Serialization;

namespace server.Models
{
    public class MasterService
    {
        public int masterId { get; set; }
        public int serviceId { get; set; }

        [JsonIgnore]
        public virtual Master? Master { get; set; }
        [JsonIgnore]
        public virtual Service? Service { get; set; }
    }
}