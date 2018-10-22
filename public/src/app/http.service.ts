import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets(){
    console.log("Made it to http.service method")
    return this._http.get('/pet');
  }
  newPets(data:Object){ 
    console.log("Made it to http.service method")
    return this._http.post('/pet',data);    
  }

  addPets(data:Object){
    console.log("Made it to http.service method - addPets")
    return this._http.post('/pet', data);
  }
  delPets(id){
    console.log("Made it to http.service method")
    return this._http.delete('/pet/' +id);
  }


  edit(data){
    console.log("Made it to http.service method")
    return this._http.put('/pet', data);
  }
  getById(id){
    console.log("Made it to http.service method")
    return this._http.get('/pet/' +id); 
  }
}
