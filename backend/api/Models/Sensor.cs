using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Sensor
    {
        public int SensorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public SensorType SensorType { get; set; }
        /* FK */
        public int? ResourceId { get; set; } // Så vi kommer åt resurs via sensor
        public Resource? Resource { get; set; }  // Så att vi kan komma åt sensor via resurs

        /* OBS vi kommer lägga till saker */
    }
}