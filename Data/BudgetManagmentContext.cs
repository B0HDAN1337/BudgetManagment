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
        public DbSet<Wallet> Wallets {get; set;}
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Wallet>().ToTable("Wallet")
            .HasOne(u => u.User)
            .WithMany(w => w.Wallets)
            .HasForeignKey(w => w.userId)
            .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Wallet>()
            .HasMany(t => t.Transactions)
            .WithOne(w => w.Wallet)
            .HasForeignKey(t => t.WalletID)
            .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Transaction>().ToTable("Transaction")
            .HasOne(u => u.User)
            .WithMany(t => t.Transactions)
            .HasForeignKey(t => t.UserID)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
