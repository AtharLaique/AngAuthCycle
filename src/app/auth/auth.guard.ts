import { 
    CanActivate ,
    ActivatedRouteSnapshot ,
    RouterStateSnapshot ,
    Router} 
from "@angular/router";

import {Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core'
//Step 4.1 inject the service
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private auth:AuthService,private router:Router){}
    canActivate(
        route:ActivatedRouteSnapshot , 
        state:RouterStateSnapshot):
        Observable<boolean>|Promise<boolean>|boolean
    {
        return this.auth.user.pipe(map(user=>{
            return !!user;
        }))
    }
}