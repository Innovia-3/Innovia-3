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
        /* Eftersom vi ska köra med JWT så behöver vi inte ha med användare, de identifieras automatiskt med JWT*/
        [Required]
        public int ResourceId { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
    }
}