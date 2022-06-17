import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { RoomContentComponent } from './room/content/room-content.component';
import { EntryComponent } from './User/entry/entry.component';
import { ProfileComponent } from './User/profile/profile.component';


const routes: Routes = [
  { path: 'signin', component:EntryComponent },
  { path: 'room/:room', component:RoomContentComponent},
  { path: '' , component: RoomComponent },
  { path:"user/:uid", component: ProfileComponent},
  { path: '**', component: RoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
