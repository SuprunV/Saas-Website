using System.Text.Json.Serialization;
namespace server.Enums
{
   [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum Gender {
            Undefined = 0,
            Male = 1,
            Female = 2
        }
}