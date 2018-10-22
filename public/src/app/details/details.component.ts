import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pet = {
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
    private _router: Router
  ) { }

  ngOnInit() {

    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      let observable = this._httpService.getById(params.id)
      observable.subscribe(data => {
        console.log(data)
        this.pet = data['data'];
      })
    })


  }
  
  delPet(id) {
    console.log("id deleting in delProduct prodcomp.ts", id)
    let observableDel = this._httpService.delPets(id);
    
    observableDel.subscribe(data => {
      console.log("Got our product in prodcomptsto delete!", data);
      //gotto pets
      this._router.navigate(['/pets']);
    }); //subscrible to obserabl
  }

}
    

