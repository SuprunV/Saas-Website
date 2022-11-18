using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using server.Enums;

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

        [JsonIgnore]
        public virtual Company? Company { get; set; }
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