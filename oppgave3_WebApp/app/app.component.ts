import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Kunde } from './Kunde';
import { Headers } from '@angular/http';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/map";

@Component({
    selector: 'my-app',
    templateUrl: './app/Form.html'
})

export class AppComponent {
    laneBelop: number;
    antallAar: number;
    resultat: string;
    show: boolean = false;


    liste: Array<Kunde>;

    Form: FormGroup;
    constructor(private _http: Http, fb: FormBuilder) {
        this.visKunder();
        this.Form = fb.group({
            personnummer: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{11}")])],
            tlf: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{8}")])],
            epost: ["", Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9 .-]+@[a-zA-Z]+.[a-zA-Z]{2,}")])],
            lanebelop: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{3,6}")])],
            aar: ["", Validators.compose([Validators.required, Validators.pattern("[0-9]{1,2}")])]
        });
    }
    utregnlan() {
        this.laneBelop = this.Form.value.lanebelop;
        this.antallAar = this.Form.value.aar;
        if (this.laneBelop > 0 && this.antallAar > 0) {
            var forsteUtregning = 0.07 * this.laneBelop;
            var andreUtregning = 1 - Math.pow(1 + 0.07, -this.antallAar);
            this.resultat = ((forsteUtregning / andreUtregning) / 12).toFixed(2) + " kr pr måned.";
        }
        else {
            this.resultat = "";
        }
    }

    onSubmit() {
        this.lagreKunde();
    }

    lagreKunde() {
        let lagretKunde = new Kunde();

        lagretKunde.personnummer = this.Form.value.personnummer;
        lagretKunde.tlf = this.Form.value.tlf;
        lagretKunde.epost = this.Form.value.epost;
        lagretKunde.laneBelop = this.Form.value.lanebelop;
        lagretKunde.antallAar = this.Form.value.aar;

        var body: string = JSON.stringify(lagretKunde);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.post("api/lane", body, { headers: headers })
            .map(returData => { return returData })
            .subscribe(
            retur => {
                alert("Lån registrert!");
                this.visKunder();
            },
            error => alert(error.statusText),
            () => console.log("ferdig post-api/kunde")
            );
    }

    visKunder() {
        this._http.get("api/lane")
            .map(returData => { return returData.json() })
            .subscribe(
            retur => {
                this.liste = retur;
            },
            error => console.log("Noe gikk galt med serveren"),
            () => console.log("")
            );
    }

    visListeKlikk() {
        this.show = !this.show;
    }
}
