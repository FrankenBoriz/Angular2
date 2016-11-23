using oppgave3_WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace oppgave3_WebApp
{
    public class DB
    {
        public bool lagKunde(string personnummer, string tlf, string epost, int laneBelop, int antallAar) {
            try {
                using (var db = new ModelContext())
                {
                    var kunde = new Kunde()
                    {
                        personnummer = personnummer,
                        tlf = tlf,
                        epost = epost,
                        laneBelop = laneBelop,
                        antallAar = antallAar
                    };
                    db.Kunder.Add(kunde);
                    db.SaveChanges();
                    return true;
                }
            }
            catch(Exception e) {
                Console.Write("Error" + e);
                return false;
            }
        }

        public List<Kunde> hentKunder() {
            try
            {
                using (var db = new ModelContext())
                {
                    return db.Kunder.ToList();
                }
            }
            catch
            {
                return null;
            }    
        }
    }
}