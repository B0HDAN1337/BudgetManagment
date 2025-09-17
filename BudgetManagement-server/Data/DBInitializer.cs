using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetManagmentServer.Data
{
    public static class DBInitializer
    {
        public static void Initializer(BudgetManagmentContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
