
//This service is  responcible for user login and user signup and mnaging user data 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; 
import  { User } from './user.model';


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
    constructor( private http:HttpClient){}
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

        }))
    }
     //Login
    login(email:string , password:string){
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',
        { email:email,
          password: password,
          returnSecureToken:true})
    }
} 