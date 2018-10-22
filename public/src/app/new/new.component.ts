import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent implements OnInit {
  newPets: any;
  flash = null;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService
  ) {}

  ngOnInit() {
    this.newPets = { name: "", type: "", desc: "", sk1: "", sk2: "", sk3: "" };
  }
  onSubmit() {
    this.addPets();
    // console.log(
    //   "It was submited  - ngOninit create under addPet",
    //   this.addPets
    // );
    //this._router.navigate(['/home']);
  }

  addPets() {
    console.log("This addPets in new.comp.ts", this.newPets);

    let observable = this._httpService.newPets(this.newPets);
    console.log("This new pet", this.newPets);
    observable.subscribe(data => {
      console.log("AddPet to our create !", data);

      if (data['message'] == "Success!"){    //For flash messages
        this._router.navigate(['/pets']);
      } else {
        this.flash = data['error']['errors']['name']['message']

      }
    });
  }
}
