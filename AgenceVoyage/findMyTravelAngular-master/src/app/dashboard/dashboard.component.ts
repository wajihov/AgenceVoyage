import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role="";
  user = {
    id: 0,
    image: "",
    role: "",
    status: "",
    firstName: "",
    lastName: ""
  }

  company = {
    id: 0,
    companyName: "",
    image: "",
    slogan: "",
    address: "",
    cP: "",
    tel: "",
    city: ""
  }

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      console.log(res)
      this.role=res.role;
      if (res.role == "client") {

        this.user.id = res.id;
        this.user.status = res.status;
        this.user.image = res.image;
        this.user.firstName = res.firstName;
        this.user.lastName = res.lastName;
      } else {
        console.log(res)
        this.company.id = res.id;
        this.company.companyName = res.companyName;
        this.company.slogan = res.slogan;
        this.company.image = res.image;
        this.company.address = res.address;
        this.company.cP = res.cP;
        this.company.tel = res.tel;
        this.company.city = res.city;
        
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

}
