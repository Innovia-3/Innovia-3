using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        public async Task<bool> CheckIsAvailableAsync(DateTime startTime, DateTime endTime, int resourceId)
        {
            throw new NotImplementedException();
        }

        public async Task<Booking> CreateBookingAsync(Booking booking)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Booking>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Booking>> GetByResourceIdAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Booking>> GetByUserIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> HasOverlappingBookingAsync(DateTime startTime, DateTime endTime, int resourceId)
        {
            throw new NotImplementedException();
        }
    }
}