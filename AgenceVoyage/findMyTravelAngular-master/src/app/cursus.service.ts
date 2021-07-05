import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursusService {
  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  constructor(private _http: HttpClient) { }

  addCursus(id,data){
    return this._http.post("http://localhost:9091/Cursus/addCursus/"+id,data,{headers: this.header});
  }
  getAllCursus(id){
    return this._http.get("http://localhost:9091/Cursus/getAllCursus/"+id,{headers: this.header})
  }
  deleteCursus(cursus){
    return this._http.get("http://localhost:9091/Cursus/delete/"+cursus.id,{headers: this.header})
  }
  editCursus(data){
    return this._http.post("http://localhost:9091/Cursus/update",data,{headers: this.header})
  }
  getActivatedCursus(){
    return this._http.get("http://localhost:9091/Cursus/getActivatedCursus")
  }
}
