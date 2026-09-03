using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceRepository _resourceRepository;
        private readonly IBookingRepository _bookingRepository;
        public ResourceController(IResourceRepository resourceRepository, IBookingRepository bookingRepository)
        {
            _resourceRepository = resourceRepository;
            _bookingRepository = bookingRepository;
        }

        [HttpGet("{resourceId:int}/bookings")]
        public async Task<IActionResult> GetBookingsByResourceId([FromRoute] int resourceId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var bookings = await _bookingRepository.GetByResourceIdAsync(resourceId);

            return Ok(bookings);
        }
    }

    /* Elaheh */
    /* Skriv logiken för att hämta alla resurser */
    /* Skriv logiken för att hämta en resurs med ett specifikt id */
    /* Skriv logiken för att hämta alla resurser med en viss 'Type' */
}