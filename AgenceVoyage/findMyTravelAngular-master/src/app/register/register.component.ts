import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerClient= new FormGroup({
    firstName: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
    lastName: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
    userName: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    birthday: new FormControl('1900-01-01'),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  });
  result = false;
  currentPasswordStrength : any;
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  register(){

    console.log( this.registerClient.value);
    this.registerService.registerClient(this.registerClient.value).subscribe( (res: any)=>{
      console.log(res);
      this.router.navigate(['/login']);
    });
  }
  
  verifUserName(e){
    this.registerService.verifUserName(e.target.value).subscribe((res: any)=>
    {
      console.log (e.target.value);
      console.log(res);
      this.result = res;
    });
  }
  checkPasswordStrength() {
    let password = this.registerClient.value.password;
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

}
