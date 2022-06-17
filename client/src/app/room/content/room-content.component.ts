import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticles } from 'src/app/model/articles';
import { RoomService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-room-content',
  templateUrl: './room-content.component.html',
  styleUrls: ['./room-content.component.sass']
})
export class RoomContentComponent implements OnInit {

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
