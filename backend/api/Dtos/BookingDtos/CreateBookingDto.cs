using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.BookingDtos
{
    public class CreateBookingDto
    {
        [Required]
        public int BookingId { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
        [Required]
        public int ResourceId { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
    }
}