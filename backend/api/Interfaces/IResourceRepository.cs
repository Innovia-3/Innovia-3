using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IResourceRepository
    {
        Task<List<Resource>> GetAllAsync();        
        /* 
            1. Räcker det med att hämta alla resurser? 
            2. Finns det något mer som är relevant för en resurs? Behöver vi en endpoint för att att hämta bokningar till
               en specifik resurs?  
         */ 
    }
}