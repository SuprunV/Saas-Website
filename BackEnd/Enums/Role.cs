using System.Text.Json.Serialization;
namespace server.Enums
{
   [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum Role {
            MASTER = 1,
            CLIENT = 2,
            ADMIN = 3
        }
}