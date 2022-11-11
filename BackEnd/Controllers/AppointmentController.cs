using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
      public class AppointmentController : ControllerBase
    {
        private readonly DataContext _context;
        public AppointmentController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{appointmentId}")]
        public ActionResult<Service> GetAppointment(int appointmentId)
        {
            var appointment = _context.Appointments!.Find(appointmentId);
            if (appointment == null)
            {
                return NotFound();
            }
            return Ok(appointment);
        }

        [HttpGet("{Date}")]
        public ActionResult<IEnumerable<Appointment>> GetEventsByDate(string Date){
            var result = _context.Appointments?.AsQueryable();
            if(Date != null){
                result = result?.Where(x => (x.date.Contains(Date)));
            }
            return Ok(result);
        }
        [HttpGet("eventsByMonthAndYear")]
        public ActionResult<IEnumerable<Appointment>> GetEventsByMonthAndYear([FromQuery] string? month, string? year){
            var result = _context.Appointments?.AsQueryable();
            if(month != null){
                result = result?.Where(x => (x.date.Substring(5, 2) == month ));
            }
            if(year != null){
                result = result?.Where(x => (x.date.Substring(0,4) == year));
            }
            
            return Ok(result);
        }

        [HttpGet("{masterId}/masterDoneAppointments")]
        public ActionResult<IEnumerable<Appointment>> GetMasterDoneAppointmentsCount(int masterId){
            var appointments = _context.Appointments!.Where(a => a.masterId == masterId);  
            var masterEvents = 0;
            foreach(var a in appointments) if(DateTime.Parse(a.date) < DateTime.Now) masterEvents++;

            return Ok(masterEvents);
        }

        [HttpGet("{companyId}/companyDoneAppointments")]
        public ActionResult<IEnumerable<Appointment>> GetCompanyDoneAppointmentsCount(int companyId){
         var  masters = _context.Masters!.Include(x => x.User).Where(m => m.User.companyId ==companyId).Select(x => x.Id).ToList();
      
          var appointments = _context.Appointments!.Where(x => masters.Contains(x.masterId));  
          var masterEvents = 0;
         foreach(var a in appointments) if(DateTime.Parse(a.date) < DateTime.Now) masterEvents++;
         return Ok(masterEvents);
        }

        [HttpPost] 
        public ActionResult<Appointment> PostAppointment(Appointment appointment){
           if(_context.Appointments!.Any(x => (x.date == appointment.date) && (x.masterId == appointment.masterId)) )
            { return BadRequest();}

            _context.Appointments!.Add(appointment);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAppointment), new { appointmentId = appointment.Id }, appointment);
        }

        [HttpDelete("{appointmentId}")]
        public ActionResult<Appointment> DeleteAppointment(int appointmentId){
            var appointment = _context.Appointments!.Find(appointmentId);
            if(!EventExists(appointmentId)){
                return NotFound();
            }
            _context.Appointments!.Remove(appointment);
            _context.SaveChanges();

            return appointment;
        }

        private bool EventExists(int id) => _context.Appointments!.Any( c => c.Id == id);
        
    }
}
