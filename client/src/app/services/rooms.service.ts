import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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