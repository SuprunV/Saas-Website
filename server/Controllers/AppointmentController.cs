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
        public ActionResult<IEnumerable<Appointment>> GetEventsByDate([FromQuery] string Date){
            var result = _context.Appointments?.AsQueryable();
            if(Date != null){
                result = result?.Where(x => (x.date == Date));
            }
            return Ok(result);
        }

        // [HttpGet]
        // public ActionResult<IEnumerable<Appointment>> GetEventsByMonthAndYear([FromQuery] string month, string year){
        //     var result = _context.Appointments?.AsQueryable();
            
        //     return Ok(result);
        // }

        [HttpGet("{masterId}/masterAppointments")]
        public ActionResult<IEnumerable<Appointment>> GetMasterAppointments(int masterId){
            var appointments = _context.Appointments!.Where(a => a.masterId == masterId);  

            var masterEvents = 0;
            foreach(var a in appointments) if(DateTime.Parse(a.date) < DateTime.Now) masterEvents++;

            return Ok(masterEvents);
        }

        [HttpGet("{serviceId}/companyAppointments")]
        public ActionResult<IEnumerable<Appointment>> GetCompanyAppointments(int companyId){
            // 1. get array of all masterIds of selected companyId
            var master = _context.Masters.Include(x => x.User).First(m => m.User.companyId ==companyId);
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

            return Ok(0);
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