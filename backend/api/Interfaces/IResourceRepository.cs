using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;

namespace api.Interfaces
{
    public interface IResourceRepository
    {
        /* hämtar alla resurser */
        Task<List<Resource>> GetAllAsync();  

        /* hämtar en specifik resurs med id */
        Task<Resource?> GetResourceAsync(int id);   

        /* hämtar resurs av viss typ */
        Task<List<Resource>> GetByTypeAsync(ResourceType type);



        //Admin? (I princip CRUD !EJ MVP!): 

        //AddResourceAsync(); 
        //UpdateResourceAsync();
        //DeleteResourceAsync();     
        /* 
            1. Räcker det med att hämta alla resurser? 
            2. Finns det något mer som är relevant för en resurs? Behöver vi en endpoint för att att hämta bokningar till
               en specifik resurs?   ALTERNATIV: Ta med bokningar i GetById och GetAllAsync, vi kör bara en include.
        */ 
        
    }
}