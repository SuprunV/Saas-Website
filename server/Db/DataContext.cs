using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace server.Db
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }        

       

    }
}