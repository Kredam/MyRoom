import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IRoom } from "../model/room";
import { Observable } from 'rxjs';
import { IFollowed } from "../model/followed";
import { IArticles } from "../model/articles";

@Injectable({
  providedIn: 'root'
})
export class RoomService{
  private rooms: Array<IRoom> = []
  
  private url = "http://127.0.0.1:8000/api/rooms/"
  
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

  getUserFollowedRooms(): Observable<IFollowed[]>{
    return this.http.get<IFollowed[]>(this.url + "followed-rooms")
  }

  getArticles(room: string):Observable<IArticles[]>{
    return this.http.get<IArticles[]>(this.url + room)
  }

}