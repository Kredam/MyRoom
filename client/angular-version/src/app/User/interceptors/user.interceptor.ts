import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor{

  constructor(private _userService : UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if(err.status === 401){
        this._userService.logout()
      }

      return throwError(err.error.message | err.statusText)
    }))
  }

}