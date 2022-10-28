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

        [HttpGet]
        public ActionResult<IEnumerable<Appointment>> GetEventsByDate([FromQuery] string? Date){
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
            // 1. get array of all masterIds of selected companyId

          var  masters = _context.Masters!.Include(x => x.User).First(m => m.User.companyId ==companyId).User.Masters.Select(x => x.Id ).ToList();
       //   var s = masters.User.Masters.Select(x => x.Id);

          //  var master = _context.Masters!.Where(a => a.User.companyId == companyId);
            var appointments = _context.Appointments!.Where(x => masters.Contains(x.Id));  
            var masterEvents = 0;
         //   foreach(var a in appointments) if(DateTime.Parse(a.date) < DateTime.Now) masterEvents++;


            // 2. filter appointments by masterIds (you have to get all appointments of all this masters from arra yMasterIds)
            // 3. filter appointments that is in past

            // var appointment = _context.Appointments!.Find(serviceId);
            // var parseDate = DateTime.Parse(appointment.date);
            // var companyEvents = 0;
            // if(parseDate < DateTime.Now)
            // {
            //  companyEvents = _context.Services!
            // .Include(x => x.AppointmentService)
            // .First(x => x.Id == serviceId)
            // .AppointmentService.Count();
            // }

            return Ok(appointments);
        }

        [HttpPost] 
        public ActionResult<Appointment> PostAppointment(Appointment appointment){
            var thisAppointment = _context.Appointments!.Any(x => x.date == appointment.date);
            if(thisAppointment)
             BadRequest();

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