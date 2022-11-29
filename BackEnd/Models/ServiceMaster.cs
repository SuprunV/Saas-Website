using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class ServiceMaster
    {
        public int Id {get; set;}   
        public int masterId {get; set;}  
        public int serviceId {get; set;}   

        public User? master = new User(); 
        public Service? service = new Service(); 
    }
}