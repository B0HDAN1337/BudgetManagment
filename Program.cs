using Microsoft.EntityFrameworkCore;
using BudgetManagmentServer.Repository;
using Microsoft.Data.Sqlite;
using BudgetManagmentServer.Data;

namespace BudgetManagmentServer
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddScoped<IUserRepository, UserRepository>();

            builder.Services.AddDbContext<BudgetManagmentContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

           


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            var app = builder.Build();


            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<BudgetManagmentContext>();
                DBInitializer.Initializer(context);
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
