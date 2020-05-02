import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { userService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private myInjector: Injector) { }

  intercept(req, next) {

    let myuserService = this.myInjector.get(userService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myuserService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
