"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var Kunde_1 = require('./Kunde');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require("rxjs/add/operator/map");
var AppComponent = (function () {
    function AppComponent(_http, fb) {
        this._http = _http;
        this.show = false;
        this.visKunder();
        this.Form = fb.group({
            personnummer: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{11}")])],
            tlf: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{8}")])],
            epost: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-Z0-9 .-]+@[a-zA-Z]+.[a-zA-Z]{2,}")])],
            lanebelop: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{3,6}")])],
            aar: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{1,2}")])]
        });
    }
    AppComponent.prototype.utregnlan = function () {
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
    };
    AppComponent.prototype.onSubmit = function () {
        this.lagreKunde();
    };
    AppComponent.prototype.lagreKunde = function () {
        var _this = this;
        var lagretKunde = new Kunde_1.Kunde();
        lagretKunde.personnummer = this.Form.value.personnummer;
        lagretKunde.tlf = this.Form.value.tlf;
        lagretKunde.epost = this.Form.value.epost;
        lagretKunde.laneBelop = this.Form.value.lanebelop;
        lagretKunde.antallAar = this.Form.value.aar;
        var body = JSON.stringify(lagretKunde);
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        this._http.post("api/lane", body, { headers: headers })
            .map(function (returData) { return returData; })
            .subscribe(function (retur) {
            alert("Lån registrert!");
            _this.visKunder();
        }, function (error) { return alert(error.statusText); }, function () { return console.log("ferdig post-api/kunde"); });
    };
    AppComponent.prototype.visKunder = function () {
        var _this = this;
        this._http.get("api/lane")
            .map(function (returData) { return returData.json(); })
            .subscribe(function (retur) {
            _this.liste = retur;
        }, function (error) { return console.log("Noe gikk galt med serveren"); }, function () { return console.log(""); });
    };
    AppComponent.prototype.visListeKlikk = function () {
        this.show = !this.show;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/Form.html'
        }), 
        __metadata('design:paramtypes', [http_2.Http, forms_1.FormBuilder])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map