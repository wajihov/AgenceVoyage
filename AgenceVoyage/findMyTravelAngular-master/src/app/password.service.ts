import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(email,data){
    return this.http.post("http://localhost:9091/user/forgotPassword/"+email, data);
  }
  resetPassword(userName,datas){
    return this.http.post("http://localhost:9091/user/resetPassword/"+userName, datas);
  }
  checkPassword(userName,data){
    return this.http.post("http://localhost:9091/user/checkPassword/"+userName, data);

  }
}
