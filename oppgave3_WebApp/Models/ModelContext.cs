namespace oppgave3_WebApp.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.ComponentModel.DataAnnotations;

    public partial class ModelContext : DbContext
    {
        public ModelContext()
            : base("name=ModelContext")
        { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        { }

        public DbSet<Kunde> Kunder { get; set; }
    }

    public class Kunde
    {
        [Key]
        public string personnummer { get; set; }
        public string tlf { get; set; }
        public string epost { get; set; }
        public int laneBelop { get; set; }
        public int antallAar { get; set; }
    }
}
