using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BookingDtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using api.Hubs;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]s")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IHubContext<BookingHub> _hubContext;
        public BookingController(IBookingRepository bookingRepository, IHubContext<BookingHub> hubContext)
        {
            _bookingRepository = bookingRepository;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _bookingRepository.GetAllAsync();

            return Ok(bookings.Select(b => b.ToBookingDto()));
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var bookings = await _bookingRepository.GetByUserIdAsync(userId);

            return Ok(bookings.Select(b => b.ToBookingDto()));
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking.ToBookingDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBookingByID([FromRoute] int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var booking = await _bookingRepository.GetByIdAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            if (booking.UserId != userId)
            {
                return Forbid();
            }

            await _bookingRepository.DeleteBookingByIdAsync(id);
            await _hubContext.Clients.All.SendAsync("BookingsChanged");
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto booking)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            if (booking.StartTime >= booking.EndTime)
            {
                return BadRequest("Starttid måste vara före sluttid.");
            }

            /* tolka inskickade tider till svensk tid */
            var swedishTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Stockholm");

            var startLocal = DateTime.SpecifyKind(
                booking.StartTime,
                DateTimeKind.Unspecified
            );

            var endLocal = DateTime.SpecifyKind(
                booking.EndTime,
                DateTimeKind.Unspecified
            );

            /* konvertera svensk tid till UTC innan bokningen sparas */
            booking.StartTime = TimeZoneInfo.ConvertTimeToUtc(
                startLocal,
                swedishTimeZone
            );

            booking.EndTime = TimeZoneInfo.ConvertTimeToUtc(
                endLocal,
                swedishTimeZone
            );

            var bookingModel = booking.ToBookingFromCreateDto(userId);

            var createdBooking = await _bookingRepository.CreateBookingAsync(bookingModel);

            if (createdBooking == null)
            {
                return Conflict("Kan inte boka vid denna tiden.");
            }

            var fullBooking = await _bookingRepository.GetByIdAsync(createdBooking.BookingId);

            await _hubContext.Clients.All.SendAsync("BookingsChanged");

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdBooking.BookingId },
                fullBooking!.ToBookingDto()
            );
        }
    }
}