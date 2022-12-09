using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.DTO
{
    public class RegCompanyDTO
    {
        public string companyName {get; set;}
        public string companyAlias {get; set;}
         public string? img {get; set;}
        public string username {get; set;}
        public string password {get; set;}
    }
}