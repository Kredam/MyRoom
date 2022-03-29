import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core'
import { Observable } from "rxjs";
import { UserService } from "../../services/user.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{

  constructor(private _userService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('access')){
      let bearer = "Bearer " + localStorage.getItem('access')
      bearer = bearer.replace(/["]+/g, '')
      console.log(bearer)
      req = req.clone({
        setHeaders: {Authorization: bearer}
      })
    }
    return next.handle(req)
  }
}