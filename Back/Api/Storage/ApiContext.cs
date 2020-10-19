using Api.Storage.DbEntities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Api.Storage
{
    public class ApiContext: DbContext
    {
        public virtual DbSet<FormDB> Forms { get; set; }
        public virtual DbSet<FieldDB> Fields { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Tables
            
            modelBuilder.Entity<FormDB>()
                .ToTable("forms")
                .HasKey(x => x.Id);

            modelBuilder.Entity<FieldDB>()
                .ToTable("fields")
                .HasKey(x => x.Id);

            #endregion

            #region Entities

            modelBuilder.Entity<FieldDB>()
                .Property(x => x.Id)
                .HasColumnName("id");

            modelBuilder.Entity<FieldDB>()
                .Property(x => x.Name)
                .HasColumnName("name");

            var jsonSettings = new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore};

            modelBuilder.Entity<FieldDB>()
                .Property(x => x.Value)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v, jsonSettings),   
                    v => JsonConvert.DeserializeObject(v, jsonSettings)
                )
                .HasColumnName("value");
            
            

            modelBuilder.Entity<FormDB>()
                .Property(x => x.Id)
                .HasColumnName("id");

            modelBuilder.Entity<FormDB>()
                .Property(x => x.Keywords)
                .HasColumnName("keywords");

            #endregion

            #region References

            modelBuilder.Entity<FieldDB>()
                .HasOne(field => field.Form)
                .WithMany(form => form.Fields)
                .HasForeignKey(field => field.FormId);

            #endregion
        }
    }
}