using Api.DataBase.DbEntities;
using Microsoft.EntityFrameworkCore;

namespace Api.DataBase
{
    public class ApiContext: DbContext
    {
        public virtual DbSet<FormDB> Forms { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FormDB>()
                .ToTable("forms")
                .HasKey(x => x.Id);

            modelBuilder.Entity<FormDB>()
                .Property(x => x.Id)
                .HasColumnName("id");

            modelBuilder.Entity<FormDB>()
                .Property(x => x.Keywords)
                .HasColumnName("keywords");
        }
    }
}