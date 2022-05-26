import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/rooms.service';
import {IArticles} from "../model/articles";
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit {

  articles: IArticles[] | undefined;
  public room_name : string | undefined

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router) { }

  test(id: any){
    this.router.navigate(['article/',id], {relativeTo: this.route})
  }

  ngOnInit(): void {
    this.room_name = this.route.snapshot.params["room"]
    this.roomService.getArticles(this.room_name!).subscribe(res => {this.articles = res})
  }

}
