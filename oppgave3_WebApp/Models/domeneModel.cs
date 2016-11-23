using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace oppgave3_WebApp.Models
{
    public class domeneKunde
    {
        [Required(ErrorMessage = "Personnummer må fylles inn.")]
        [RegularExpression("[0-9]{11}", ErrorMessage = "Personnummer må oppgis (11 siffer)")]
        public string personnummer { get; set; }

        [Required(ErrorMessage = "Telefonnummer må fylles inn.")]
        [RegularExpression("[0-9]{8}", ErrorMessage = "Telefonnummer må oppgis (8 siffer)")]
        public string tlf { get; set; }

        [Required(ErrorMessage = "Epost må fylles inn.")]
        [RegularExpression("[a-zA-Z0-9 .-]+@[a-zA-Z]+.[a-zA-Z]{2,}", ErrorMessage = "Epost må oppgis (abc123@de.fg)")]
        public string epost { get; set; }

        [Required(ErrorMessage = "Lånebeløp må fylles inn.")]
        [RegularExpression("[0-9]{3,6}", ErrorMessage = "Lånebeløp må oppgis (3-6 siffer)")]
        public int laneBelop { get; set; }

        [Required(ErrorMessage = "Antall år må fylles ut.")]
        [RegularExpression("[0-9]{1,2}", ErrorMessage = "Antall år må oppgis (1-2 siffer)")]
        public int antallAar { get; set; }

    }
}