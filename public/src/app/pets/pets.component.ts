import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  
  pet = {
    name: "",
    type: "",
    desc: "",
    sk1: "",
    sk2: "",
    sk3: "",
  };
  pets = {
    name: "",
    type: "",
    desc: "",
    sk1: "",
    sk2: "",
    sk3: "",
  };
  constructor(
    private _route: ActivatedRoute,
    private _httpService: HttpService,
    private _router: Router,
    private _http: HttpService,
  ) { }

  ngOnInit() {
    this.getPets();

    this.pets= {
      name: "",
      type: "",
      desc: "",
      sk1: "",
      sk2: "",
      sk3: "",
    };
  }
  getPets(){
    let observable = this._httpService.getPets();
    observable.subscribe(data => {
      // this.pet = data["data"]; //expecting sub data
      this.pets = data['data']; //Trying to dup in case its in the wrong one
      // console.log("Got our Pet in pets.comp.ts!", data); // tried data['data'] and returned empty
      console.log("Got our Pet in pets.comp.ts!", data['data']);
      // this.getPets(); //refresh list after a delete
    });

  // delPets(id) {
  //   console.log("id deleting in delPet prodcomp.ts", id)
  //   let observableDel = this._httpService.delPets(id);
  //   observableDel.subscribe(data => {
  //     console.log("Got our pet in prodcomptsto delete!", data);
  //     this.delPets = data["data"];
  //     this.getPets(); //refresh list after a delete
  //   }); //subscrible to obserabl
  // }

  // editPet(id){
  }
}
