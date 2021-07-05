import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private _http: HttpClient) { }

  uploadMultiple(data) {
    let header = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
   return this._http.post('http://localhost:9091/uploadMultipleFiles',data,{headers: header});
  }
  

}