using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace server.Models
{
    public class ServiceMaster
    {
        public int Id {get; set;}   
        public int masterId {get; set;}  
        public int serviceId {get; set;}
        [JsonIgnore]
        private User? master = new User();
        [JsonIgnore]
        public Service? service = new Service(); 
    }
}