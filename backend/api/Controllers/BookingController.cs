using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;
        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var bookings = await _bookingRepository.GetAllAsync();

            return Ok(bookings);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var booking = await _bookingRepository.GetByIdAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBookingByID([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var booking = await _bookingRepository.
            DeleteBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        /*   [HttpPost]
          public async Task<IActionResult> CreateBooking([FromBody] BookingDto booking)
          {            
              if(!ModelState.IsValid)
              {
                  return BadRequest();
              }       
              booking =  await _bookingRepository.CreateBookingAsync(booking);
              return booking;
          } */
    }
}