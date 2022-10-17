using System.Text.Json.Serialization;
namespace server.Enums
{
   [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum Role {
            Master = 1,
            Client = 2,
            Admin = 3
        }
}