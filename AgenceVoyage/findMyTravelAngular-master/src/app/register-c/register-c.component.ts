import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterCompanyService } from '../register-company.service';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css']
})
export class RegisterCComponent implements OnInit {

  registerCompanyData= new FormGroup({
      companyName: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
	    address: new FormControl('', [Validators.minLength(10), Validators.maxLength(25), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required]),
	    city: new FormControl('', [Validators.required]),
	    cP: new FormControl('', [Validators.min(1000), Validators.max(9999), Validators.pattern('[0-9 ]*'), Validators.required]),
      tel: new FormControl('', [Validators.min(10000000), Validators.max(99999999), Validators.pattern('[0-9 ]*'), Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      userName: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.required])
  });
  currentPasswordStrength : any;
  result = false;
  

  constructor(private registerCompanyService: RegisterCompanyService, private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  verifUserName(e){
    this.registerService.verifUserName(e.target.value).subscribe((res: any)=>
    {
      console.log (e.target.value);
      
      this.result = res;
      console.log(this.result);
    });
  }

  registerCompany(){
    // console.log(this.registerCompanyData.value)
    this.registerCompanyService.post(this.registerCompanyData.value).subscribe((res : any)=>{
      console.log(res);
      this.router.navigate(['/login']);
    });
  }
  checkPasswordStrength() {
    let password = this.registerCompanyData.value.password;
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
    console.log(this.registerCompanyData.value);
  }

}
