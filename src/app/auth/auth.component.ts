import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //we will store data using subject.
  //Assing a <type / user> to Subject because Subject is a gnaric type.
  //https://reactgo.com/angular-component-communication/
  //https://stackoverflow.com/questions/47275385/what-are-pipe-and-tap-methods-in-angular-tutorial
  user=new Subject<User>()
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
    if(this.isLogin){
       this.auth.login(form.value.email, form.value.password)
       .subscribe((resData)=>{
        console.log(resData)
        this.isError=false;
      },(error)=>{
        console.log(error)
        this.isError=true;
        this.message=error.error.error.message;
      })

    }else{
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
    form.reset()
  }

}
