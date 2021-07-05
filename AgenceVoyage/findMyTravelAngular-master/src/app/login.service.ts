import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as JWT from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userName: any;
  constructor(private _http: HttpClient, private router:Router) {
    this.userName = this.decodeToken();
   }

  login(data){
    let header = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post("http://localhost:9091/user/login",data, {headers: header});
  }
  
  decodeToken() {
    if(localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      return JWT(token)['sub'];  
    } else {
      return null;
    }
    
  }

}
