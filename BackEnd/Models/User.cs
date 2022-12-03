using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using server.Enums;
using server.Models;

namespace server.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? login { get; set; }
        public string? password { get; set; }
        public string? name { get; set; }
        public string? surname { get; set; }
        public string? DoB { get; set; }
        public Gender gender { get; set; }
        public Role role { get; set; }
        public string? img { get; set; }
        public int? companyId { get; set; }

        // [JsonIgnore]
        public virtual Company? Company { get; set; }
        [JsonIgnore]
         public virtual ICollection<Appointment> AppointmentClient { get; set; } = new List<Appointment>();
         [JsonIgnore]
         public virtual ICollection<Appointment> AppointmentMaster { get; set; } = new List<Appointment>();
    }
    public class UserToken {
        public int id {get; set;}
        public string? img {get; set;}
        public string? name {get; set;}
        public string? email {get; set;}
        public Role role {get; set;}
        public string? companyName {get; set;}
        public string? companyAlias {get; set;}
        public int? companyId {get; set;}
    }
};