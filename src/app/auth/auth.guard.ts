import { 
    CanActivate ,
    ActivatedRouteSnapshot ,
    RouterStateSnapshot ,
    Router,
    UrlTree} 
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
        Observable<boolean |   UrlTree>|Promise<boolean>|boolean
    {
        console.log(route.url[0].path)
        if(route.url[0].path!='auth'){
            return this.auth.user.pipe(map(user=>{
                const isAuth=!!user;
                if(isAuth)
                {
                    return true;
                }
                else{
                    return this.router.createUrlTree(['/auth'])
                }
            }))
        }
        else{
            return this.auth.user.pipe(map(user=>{
                const isAuth=!!user;
                if(isAuth)
                {
                    return this.router.createUrlTree(['/recipes'])
                   
                }
                else{
                    return true;
                }
            }))
          
        }
        
    }
}