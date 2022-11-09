using Microsoft.EntityFrameworkCore;
using server.Db;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddDbContext<DataContext>(opts => opts.UseNpgsql(builder.Configuration.GetConnectionString("default")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder => {
    builder
    .SetIsOriginAllowed(_ => true)
    .AllowCredentials()
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

var app = builder.Build();

using (var scope = ((IApplicationBuilder) app).ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
using (var context = scope.ServiceProvider.GetService<DataContext>()) {
    context?.Database.EnsureDeleted(); // reset db
    context?.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
}
app.UseCors("MyPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
