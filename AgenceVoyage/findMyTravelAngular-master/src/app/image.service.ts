import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http:HttpClient) { }
  header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  addImage(id,data){
   return this._http.post("http://localhost:9091/Image/addImage/"+id,data,{headers: this.header});
  }
  deleteImage(id){
    return this._http.get("http://localhost:9091/Publication/clearImages/"+id,{headers: this.header});
  }
}
