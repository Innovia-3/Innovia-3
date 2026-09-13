using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ResourceDtos;
using api.Interfaces;

namespace api.Services
{
    public class AvailabilityService
    {
        private readonly IBookingRepository _bookingRepository; 
        private readonly IResourceRepository _resourceRepository; 

        public AvailabilityService(IBookingRepository bookingRepository, IResourceRepository resourceRepository)
        {
            _bookingRepository = bookingRepository;
            _resourceRepository = resourceRepository; 
        }

        
    }
}