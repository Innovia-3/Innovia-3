using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace api.Models
{
    public class Resource
    {
        public int ResourceId { get; set; }
        public ResourceType ResourceType { get; set; }
        private int _timeSlotTimeInHours;
        public int TimeSlotTimeInHours
        {
            get
            {
                return _timeSlotTimeInHours;
            }
            set
            {
                switch (ResourceType)
                {
                    case ResourceType.Skrivbord:
                        _timeSlotTimeInHours = 3;
                        break;
                    case ResourceType.Mötesrum:
                        _timeSlotTimeInHours = 3;
                        break;
                    case ResourceType.VRHeadset:
                        _timeSlotTimeInHours = 1;
                        break;
                    case ResourceType.AIServer:
                        _timeSlotTimeInHours = 1;
                        break;
                    default:
                        _timeSlotTimeInHours = 1;
                        break;
                }
            }
        }
        public int? Capacity { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<Sensor> Sensors { get; set; } = new List<Sensor>();
    }
}