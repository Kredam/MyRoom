import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IRoom } from "../model/room";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { IArticles } from "../model/articles";

@Injectable({
  providedIn: 'root'
})
export class RoomService{
  private rooms: Array<IRoom> = []
  
  private url = environment.apiUrl + "rooms/"
  
  constructor(private http: HttpClient){ }
  
  followRoom(name: string) {
    let bearer = "Bearer " + localStorage.getItem('access')
    //felsovonas benne maradt ezert hasznaltam replace-t
    bearer = bearer.replace(/["]+/g, '')
    return this.http.post(this.url + 'follow/', {name: name, isAdmin:false}, {
      headers: new HttpHeaders({
        "Authorization" : bearer
      })
    })
  }
  
  getRooms(): Observable<IRoom[]>{
    return this.http.get<IRoom[]>(this.url + "all")
  }

  getUserFollowedRooms(): Observable<String[]>{
    return this.http.get<String[]>(this.url + "followed-rooms")
  }

  getArticles(room: string):Observable<IArticles[]>{
    return this.http.get<IArticles[]>(this.url + room)
  }

  getThread(offset: number, limit: number): Observable<IArticles[]>{
    return this.http.get<IArticles[]>(this.url)
  }

}