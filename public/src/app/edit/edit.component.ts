import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet = {
    name: "",
    type: "",
    desc: "",
    sk1: "",
    sk2: "",
    sk3: "",
  };
  
  flash = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService
  ) { }


  ngOnInit() {  
    //obserable here
    this._route.params.subscribe((params: Params) => { // Passing the object from the DB, but not editing it.
      console.log(" Id was passed in ngOnInit ",params['id'])

      let obserable =this._http.getById(params['id'])
      obserable.subscribe(data => {
        console.log("Got the specific data back from the server", data);
        this.pet = data['data']
      })
    });
  }
  editPet(){
    if (this.pet.name.length > 3  && this.pet.type.length >3 && this.pet.desc.length ) { //validations
      let obserable = this._http.edit(this.pet)
      obserable.subscribe(data => {
        console.log("Got the specific data back from the server", data);
        // this. = data['data'] //Don't need this?
        if (data['message'] == "Success!"){
          this._router.navigate(['/pets']);
        }
      })
    }
    else { 
      //flash error message
      this.flash = "Please make sure that all imputs are valid."
    }
  //reprs what the observalbe sees
  }

}
