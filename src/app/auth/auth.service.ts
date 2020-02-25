
//This service is  responcible for user login and user signup and mnaging user data 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; 
import  { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';



interface AuthResponceData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
}


//If we use providedIn, the injectable is registered as a provider of the Module without 
//adding it to the providers of the module.
@Injectable({providedIn:'root'})
export class AuthService {
//we will store data using subject.
  //Assing a <type / user> to Subject because Subject is a gnaric type.
  //https://reactgo.com/angular-component-communication/
  //https://stackoverflow.com/questions/47275385/what-are-pipe-and-tap-methods-in-angular-tutorial
  user=new Subject<User>()
    constructor( private http:HttpClient ,private router:Router){}
    //Signup
    signup(email:string , password:string){
       return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',{
            email:email,
            password: password,
            returnSecureToken:true
           })
           .pipe( tap(resData=>{
            console.log("tap")
           console.log(resData)
           const expirationDate=new Date( new Date().getDate()+ + resData.expiresIn*1000);
           const user= new User(resData.email ,  resData.localId ,resData.refreshToken ,expirationDate);
           this.user.next(user)
           console.log(user)

        }))
    }
     //Login
    login(email:string , password:string){
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',
        { email:email,
          password: password,
          returnSecureToken:true})
          .pipe( tap(resData=>{
            console.log("tap")
           console.log(resData)
           const expirationDate=new Date( new Date().getDate()+ + resData.expiresIn*1000);
           const user= new User(resData.email ,  resData.localId ,resData.refreshToken ,expirationDate);
           this.user.next(user)
           localStorage.setItem('userData',JSON.stringify(user))
           console.log(user)

        }))
    }
    //logout
    logout(){
      this.user.next(null)
      this.router.navigate(['/auth'])
    }
    //auto-login
    autoLogin(){
     const userData=JSON.parse(localStorage.getItem('userData'))
     if(!userData)
     {
       return null;
     }
    }
} 