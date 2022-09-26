import { Component, OnInit } from '@angular/core';
import { IFollowed } from '../model/followed';
import { IRoom } from '../model/room';
import { RoomService } from '../services/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public rooms: Array<IRoom> = [];

  public followed_rooms: Array<IFollowed> = []


  followRoom(event: EventTarget, name: string){
    let action = (event as Element).textContent
    if(action === 'follow'){
      this._roomService.followRoom(name).subscribe();
      (event as Element).textContent = "unfollow"
    }else{
      this._roomService.followRoom(name).subscribe();
      (event as Element).textContent = "follow"
    }
  }


  localStorageGet(name : string){
    return localStorage.getItem(name)
  }

  constructor(private _roomService: RoomService) { }

  ngOnInit(): void {
    this._roomService.getRooms().subscribe(event =>{
      for (let i = 0; i < event.length; i++) {
        this.rooms.push({...event[i]})
      }
    })
  }

}
