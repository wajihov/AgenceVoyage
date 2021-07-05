import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';
import { LoginService } from 'src/app/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  file: any;

  constructor(private router: Router,
    private profileService: ProfileService,
    private loginService: LoginService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

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

  modifyCompanyData = new FormGroup({
    id: new FormControl(this.company.id),
    companyName: new FormControl(this.company.companyName, [Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
    slogan: new FormControl(this.company.slogan),
    address:new FormControl(this.company.address, [Validators.required]),
    city:new FormControl(this.company.city, [Validators.required]),
    cP:new FormControl(this.company.cP, [Validators.required]),
    tel:new FormControl(this.company.tel, [Validators.required])
  });


  passChangeButton = false;
  currentPasswordStrength = "";
  confirm = true;
  lastPassword = false;

  modifyPassData = new FormGroup({
    lastPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl("", Validators.required)
  });
modalUpdate(){
  this.modifyCompanyData.setValue({
   id: this.company.id,
   companyName:this.company.companyName,
   slogan: this.company.slogan,
   address:this.company.address,
   cP:this.company.cP,
   tel:this.company.tel,
   city:this.company.city

  });
}
 
  ngOnInit() {
    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      this.company.id = res.id;
      this.company.companyName = res.companyName;
      this.company.slogan = res.slogan;
      this.company.image = res.image;
      this.company.address = res.address;
      this.company.cP = res.cP;
      this.company.tel = res.tel;
      this.company.city = res.city;

      
    });
  }
  modifyCompany() {
    this.profileService.updateCompanyProfile(this.modifyCompanyData.value).subscribe((res: any) => {
      Swal.fire(
        'Success!',
        'Profile updated.',
        'success'
      );
      this.company.id = res.id;
      this.company.companyName = res.companyName;
      this.company.slogan = res.slogan;
      this.company.image = res.image;
      this.company.address = res.address;
      this.company.cP = res.cP;
      this.company.tel = res.tel;
      this.company.city = res.city;
    });

  }
  modifPass() {
    const data = {
      password: this.modifyPassData.value.newPassword
    }
    this.profileService.post(data, this.loginService.userName).subscribe(res => {
      console.log(res);
      Swal.fire(
        'Success!',
        'Password changed.',
        'success'
      ).then((result) => {
        if (result.value) {
          this.router.navigated = true;
          this.router.navigate([this.router.url]);
        }

      });

    });
  }
  checkPassword() {
    if (this.modifyPassData.value.newPassword !== this.modifyPassData.value.confirmPassword) {
      this.confirm = false;
    }
    else {
      this.confirm = true;

    }
  }
  checkLastPassword() {
    const data2 = {
      password: this.modifyPassData.value.lastPassword
    }
    this.profileService.getConfirmPassword(this.loginService.userName, data2).subscribe((res: any) => {
      this.lastPassword = res;
    });
  }
  checkPasswordStrength() {
    let password = this.modifyPassData.value.newPassword;
    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

    // Assume we have a poor password already
    this.currentPasswordStrength = "Short";

    // Check then strenth of this password using some simple rules
    if (password === null || password.length < 8) {
      this.currentPasswordStrength = ""
    } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      this.currentPasswordStrength = "Weak password";
    } else if (numberOfElements === 3) {
      this.currentPasswordStrength = "Password Ok";
    } else {
      this.currentPasswordStrength = "Strong password";
    }

    console.log(this.currentPasswordStrength)
  }

  upload(event) {
    this.file = event.target.files[0];
  }

  confirmUpload() {
    let formData = new FormData();
    formData.append("file", this.file);
    this.profileService.postImage(formData, this.company.id).subscribe(res => {
      console.log("upload confirm");
      console.log(res);
      Swal.fire(
        'Success!',
        'Image uploaded.',
        'success'
      );
      this.profileService.get(this.loginService.userName).subscribe((res: any) => {
        this.company.id = res.id;
        this.company.companyName = res.companyName;
        this.company.slogan = res.slogan;
        this.company.image = res.image;
        this.company.address = res.address;
        this.company.cP = res.cP;
        this.company.tel = res.tel;
        this.company.city = res.city;
      });
    });

  }


}
