using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class ResourceRepository : IResourceRepository
    {
        public Task<List<Resource>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Resource>> GetByTypeAsync(ResourceType type)
        {
            throw new NotImplementedException();
        }

        public Task<Resource?> GetResourceAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}