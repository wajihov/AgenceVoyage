import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }

  registerClient(data){
    console.log(data);
    return this._http.post("http://localhost:9091/Client/addClient",data);
  }
  verifUserName(userName){
    return this._http.get("http://localhost:9091/Client/verifUserName/"+userName);
  }
  
}
