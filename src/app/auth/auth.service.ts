
//This service is  responcible for user login and user signup and mnaging user data 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//If we use providedIn, the injectable is registered as a provider of the Module without 
//adding it to the providers of the module.
@Injectable({providedIn:'root'})
export class AuthService {
    constructor( private http:HttpClient){}
    //Signup
    signup(email:string , password:string){
        this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',{
            email:email,
            password: password,
            returnSecureToken:true
           })
    }
     //Login
    login(){}
} 