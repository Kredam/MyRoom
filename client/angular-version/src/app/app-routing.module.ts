import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { ThreadComponent } from './thread/thread.component';
import { EntryComponent } from './User/entry/entry.component';
import { ProfileComponent } from './User/profile/profile.component';


const routes: Routes = [
  { path: 'signin', component:EntryComponent },
  { path:"user/:uid", component: ProfileComponent},
  { path: '', component: ThreadComponent},
  { path: 'room', loadChildren: () => import('./room/room.module').then(e => e.RoomModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
