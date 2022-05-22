import { Component, OnInit } from '@angular/core';
import { IFollowed } from '../model/followed';
import { IRoom } from '../model/room';
import { RoomService } from '../services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public rooms: Array<IRoom> = [];

  public followed_rooms: Array<IFollowed> = []

  constructor(private _roomService: RoomService) { }

  ngOnInit(): void {
    if(localStorage.getItem('access')){
      this._roomService.getUserFollowedRooms().subscribe(res => this.followed_rooms = res)
      console.log(this.followed_rooms)
    }else{
      this._roomService.getRooms().subscribe(res => this.rooms = res)
      console.log(this.rooms)
    }
  }

}
