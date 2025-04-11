using BudgetManagmentServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagmentServer.Data
{
    public class BudgetManagmentContext : DbContext
    {
        public BudgetManagmentContext(DbContextOptions<BudgetManagmentContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("User");
        }
    }
}
