using oppgave3_WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace oppgave3_WebApp.Controllers
{
    public class laneController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Post([FromBody]domeneKunde v)
        {
            if (ModelState.IsValid)
            {
                DB database = new DB();
                bool OK = database.lagKunde(v.personnummer, v.tlf, v.epost, v.laneBelop, v.antallAar);

                if (OK)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
                else {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        ReasonPhrase = "Kunne ikke registrere kunde i databasen (NB: 1 søknad per kunde!)"
                    };
                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                ReasonPhrase = "Kunne ikke registrere kunde i Databasen."
            };
        }
        [HttpGet]
        public HttpResponseMessage Get() {
            DB database = new DB();
            var resultat = database.hentKunder();

            if (resultat == null)
            {
                return new HttpResponseMessage()
                {StatusCode = HttpStatusCode.Conflict,ReasonPhrase = "Noe gikk galt på serveren, prøv igjen senere"};
            }

            var Json = new JavaScriptSerializer();
            string list = Json.Serialize(resultat);

            return new HttpResponseMessage()
            {StatusCode = HttpStatusCode.OK,Content = new StringContent(list)};
        }
    }
}