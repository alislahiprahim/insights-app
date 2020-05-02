import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private myuserService: userService, private myrouter: Router) { }

  canActivate(): boolean {
    
    if (this.myuserService.loggedIn()) {
      return true
    } else {
      this.myrouter.navigate(['/login'])
      return false
    }
  }

}

