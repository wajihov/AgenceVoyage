import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { PasswordService } from '../password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new FormGroup({

    userName: new FormControl(''),
    password: new FormControl('')
  });
  forgotPassword = new FormGroup({

    email: new FormControl("youremail@gmail.com",
      Validators.compose([
        Validators.required,
        Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+\\.[a-z]{2,3}")

      ])),
    userName: new FormControl('')
  });
  result: true;
  resultPassword: any;
  isOpened : any;
  constructor(private loginService: LoginService, private registerService: RegisterService, private passwordService: PasswordService, private router: Router) { }

  ngOnInit() {
  
  }
  onClickCreate(){
    if(this.isOpened != true)
    {
      this.isOpened = true;
    }
    else{
      this.isOpened = false
    }
  }
   

  onClickLogin() {
    
    
    this.loginService.login(this.login.value).subscribe((res: any) => {
     console.log(res);
    localStorage.setItem('token', res.token);
    this.loginService.userName = this.loginService.decodeToken();
    this.router.navigate(['/']);
      
     });

  }

  verifUserName(e) {
    this.registerService.verifUserName(e.target.value).subscribe((res: any) => {
      console.log(this.login.value);
      this.result = res;
      console.log(res)
    });
  }

  verifPassword(e){
    this.passwordService.checkPassword(this.login.value.userName, this.login.value).subscribe((res: any)=>{
      this.resultPassword = res;
      console.log(this.login.value);
      console.log(res);
    });
  }

  onClickSend() {
    console.log(this.forgotPassword.value);
    this.passwordService.forgotPassword(this.forgotPassword.value.email, this.forgotPassword.value).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token',res.token);
    });
  }

}
