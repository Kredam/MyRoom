import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './room/article/article.component';
import { RoomComponent } from './room/room.component';
import { EntryComponent } from './User/entry/entry.component';
import { ProfileComponent } from './User/profile/profile.component';


const routes: Routes = [
  { path: 'signin', component:EntryComponent },
  { path: '' , component: HomeComponent },
  { path: 'room/:room', component: RoomComponent, 
    children:[
      {path:"article/:article", component:ArticleComponent}
    ]
  },
  { path:"user/:uid", component: ProfileComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
