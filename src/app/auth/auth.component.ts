import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  isError=false;
  message=''
  isLogin=false;

  constructor(private auth :AuthService , private router:Router) { }

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
        //Phase 4: We can redirect in an service but 
        // we don't want to intract with our interface in serice. so here
        this.router.navigate(['/recipes'])
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
