import { Component, OnInit } from '@angular/core';
import {  AuthGuardService as AuthGuard } from '../auth-guard.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  constructor(private authGuard:AuthGuard, private router: Router, private profileService: ProfileService) { }

  active:any;
  isMatMenuOpen : any;
  firstName : string;
  lastName: string;
  
  ngOnInit() {
    this.active= this.authGuard.canActivate();
    if (localStorage.getItem('token')) {
      let decodedToken = localStorage.getItem('token');
      let userName = jwt_decode(decodedToken)['sub'];
      this.profileService.get(userName).subscribe((res: any) => {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        console.log(this.firstName);
        
      });
    }
     }
  logout() {
      localStorage.clear();
      this.active = false;
      this.router.navigate(["/"]);
    }
    menuenter(){
      if(this.isMatMenuOpen == false){
        this.isMatMenuOpen = true;
      }
      else {
        this.isMatMenuOpen = false;
      }
      
    }

}
