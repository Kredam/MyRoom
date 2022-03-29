import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../model/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = new BehaviorSubject<IUser>({
    username: "",
    email: "",
    born: "",
    access:"",
    refresh: ""
  })
  private url = "http://127.0.0.1:8000/api/"

  constructor(private http: HttpClient) { }


  //TODO 
  //rewrite function to fill up user subject with needed information 
  getUserData(): Observable<IUser>{
    return this.http.get<IUser>(this.url + "users/get_all")
  }

  registerUser(userInfo: IUser): Observable<IUser>{
    return this.http.post<IUser>(this.url + "users/register", userInfo)
  }

  //TODO
  //rewrite to extend IUser object rather than replace it
  loginUser(userinfo : IUser): Observable<IUser>{
    return this.http.post<IUser>(this.url + "token", userinfo).pipe(map(res =>{
      this.user.next(res);
      console.log(this.user.value);
      localStorage.setItem("access", JSON.stringify(res.access))
      localStorage.setItem("refresh", JSON.stringify(res.refresh))
      return res;
    }))
  }

  refreshToken(token: String): Observable<String>{
    return this.http.post<String>(this.url + "token/refresh", token)
  }

  //TODO
  //rewrite whole local storage concept to cookies
  logout(){
    localStorage.clear()
  }
}
