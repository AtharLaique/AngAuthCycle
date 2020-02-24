import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin=false;

  constructor() { }

  ngOnInit() {

  }
  onSwitch(){
    this.isLogin=!this.isLogin;

  }
  onSubmit(form:NgForm){
    console.log(form.value)

  }

}
