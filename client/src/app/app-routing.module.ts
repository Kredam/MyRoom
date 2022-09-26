import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './User/entry/entry.component';
import { ProfileComponent } from './User/profile/profile.component';


const routes: Routes = [
  { path: 'signin', component:EntryComponent },
  { path:"user/:uid", component: ProfileComponent},
  { path: 'room', loadChildren: () => import('./room/room.module').then(e => e.RoomModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
