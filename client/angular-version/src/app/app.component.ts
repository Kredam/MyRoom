import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Animetracker';
  
  constructor(public _userService: UserService){

  }

  getLocalStorage(name: string){
    return localStorage.getItem(name)
}
}
