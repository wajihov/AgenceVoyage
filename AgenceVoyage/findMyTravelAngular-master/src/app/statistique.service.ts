import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  constructor(private _http:HttpClient) { }

  getStat(){
   
    return this._http.get("http://localhost:9091/Statistique/getAll",{headers: this.header})
  }

 
}
