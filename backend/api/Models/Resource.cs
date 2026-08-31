using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Resource
    {
        public int ResourceId {get; set;} 
        public int Quantity {get; set;}
        public ResourceType ResourceType {get; set;}
        public int? Capacity {get;set;}
        public bool isAvailable {get; set;} /* Eftersom vi ska hantera om en bokning är temporärt reserverad kan vi lösa
        detta med hjälp av state i React, blir bool jobbigt senare i projektet kan vi enkelt lösa det i frontend. */
    }
}
