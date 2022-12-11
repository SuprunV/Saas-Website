using System.Text.Json.Serialization;
namespace server.Enums
{
   [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum Weekday {
            Mon = 1,
            Tue = 2,
            Wed = 3,
            Thu = 4,
            Fri = 5,
            Sat = 6,
            Sun = 7
            
        }
}