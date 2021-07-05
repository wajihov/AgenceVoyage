import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../password.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordd= new FormGroup({
  
    Password: new FormControl(''),
    Confirmpassword : new FormControl('')
  });
  userName : any;
  result = true;
  button = true;

  constructor(private PasswordService: PasswordService, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {
   
     if(!this.resetPasswordd.value.Password)
     {
      this.button = false;
     }
   
  }
  verifPassword(e){
    console.log(this.resetPasswordd.value.Password);
    console.log(this.resetPasswordd.value.Confirmpassword);
    
    if(this.resetPasswordd.value.Password !== e.target.value)
    {
      this.result = false;
    }
    else if(this.resetPasswordd.value.Confirmpassword !== e.target.value)
    {
      this.result = false;
    }
    else{
      this.result = true;
    }
    
  }
  onClickChangePassword(){
    console.log(this.resetPasswordd.value.Password);
    console.log(this.resetPasswordd.value.Confirmpassword);

    
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName');
    const obj = {password: this.resetPasswordd.value.Password};
    this.PasswordService.resetPassword(this.userName, obj).subscribe((res: any)=>
    {
      console.log(res);
    });
  }

}
