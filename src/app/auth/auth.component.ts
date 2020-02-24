import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isError=false;
  message=''
  isLogin=false;

  constructor(private auth :AuthService) { }

  ngOnInit() {

  }
  onSwitch(){
    this.isLogin=!this.isLogin;

  }
  onSubmit(form:NgForm){
    console.log(form.value)
    this.auth.signup(form.value.email, form.value.password)
    .subscribe((resData)=>{
      console.log(resData)
      this.isError=false;
      this.onSwitch()
    },(error)=>{
      this.isError=true;
      this.message=error.error.error.message;
    })

  }

}
