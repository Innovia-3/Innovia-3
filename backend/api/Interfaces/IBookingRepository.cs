using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IBookingRepository
    {
        /* Samma visa som resurs, vad är relevant */
        Task<Booking?> GetByIdAsync(int id);
        Task<IEnumerable<Booking>> GetAllAsync();
        Task<IEnumerable<Booking>> GetByUserIdAsync(string id);
        Task<IEnumerable<Booking>> GetByResourceIdAsync(int resourceId);
        Task<bool> IsResourceAvailableAsync(DateTime startTime, DateTime endTime, int resourceId);
        Task<Booking?> CreateBookingAsync(Booking booking);



        // Task<Id|null>(resourceType, time)
        //om det finns en ledig resurs för tiden, returnera första bästa id för denna, annars returna null(?).

        // [HttpPut] , id -> 
        // Vi måste skapa slots
        // Fetch alla typer -> Fetch alla skrivbord -> O -> 

        //Fetch -> O ->  
        /* Istället för att hantera bokningslogiken med en bool? */
    }
}
