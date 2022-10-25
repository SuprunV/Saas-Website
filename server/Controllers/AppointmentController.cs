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

        [HttpGet("{masterId}/events")]
        public ActionResult<IEnumerable<Appointment>> GetMasterAppointments(int masterId){
            var masterEvents = _context.Masters!
            .Include(x => x.AppointmentMaster)
            .First(x => x.Id == masterId)
            .AppointmentMaster;

            return Ok(masterEvents);
        }

        [HttpPost] 
        public ActionResult<Appointment> PostAppointment(Appointment appointment){
            var thisAppointment = _context.Appointments!.Any(x => x.date == appointment.date);
            if(thisAppointment)
             BadRequest();

            _context.Appointments!.Add(appointment);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
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