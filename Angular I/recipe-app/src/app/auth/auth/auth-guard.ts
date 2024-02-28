import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

export interface CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}

@Injectable({providedIn: 'root'}) 
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), 
            map(user=> {
            const isAuth =  !!user;
            if (isAuth) return true;

            return this.router.createUrlTree(['/auth']);
        }))
    }
}

export const UserLoggedIn: CanActivateFn = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ) => {
        return inject(AuthGuard).canActivate(route, state);
    }
    