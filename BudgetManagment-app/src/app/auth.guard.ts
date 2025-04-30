import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, GuardResult, MaybeAsync} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate
{

  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const token = localStorage.getItem('token');

    if(token)
    {
      return true;
    }
    return this.router.navigate(['/user-log-in']);
  }
  
};
