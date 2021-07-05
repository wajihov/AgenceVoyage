import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }
  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  
  getallClient(){ 
    return this._http.get("http://localhost:9091/Client/getAllClient",{headers: this.header})
  }
  getallCompany(){
    return this._http.get("http://localhost:9091/Company/getAllCompany",{headers: this.header})
  }
  getallPublication(){
    return this._http.get("http://localhost:9091/Publication/getAllPublication",{headers: this.header})
  }
  getallCursus(){
    return this._http.get("http://localhost:9091/Cursus/getAllCursus",{headers: this.header})
  }
  deleteClient(id){
    return this._http.get("http://localhost:9091/Client/delete/"+id,{headers: this.header})
  }
  deletePublication(pub){
    return this._http.post("http://localhost:9091/Publication/deletePublication",pub,{headers: this.header})
  }
  deleteCursus(id){
    return this._http.get("http://localhost:9091/Cursus/delete"+id,{headers: this.header})
  }
  deleteCompany(id){
    return this._http.get("http://localhost:9091/Company/delete"+id,{headers: this.header})
  }
}
