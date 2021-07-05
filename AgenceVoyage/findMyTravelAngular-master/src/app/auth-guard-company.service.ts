import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import * as JWT from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCompanyService {

  constructor(public auth: AuthService, public router: Router, private profileService:ProfileService) { }
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      let decodedToken = localStorage.getItem('token');
      let userName = JWT(decodedToken)['sub'];
      this.profileService.get(userName).subscribe((res: any) => {
        if(res.role == "company"){
          return true;
        }

      });
      this.router.navigate(['']);
      return false;
    }
  }
}
