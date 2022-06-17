import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { EntryComponent } from './User/entry/entry.component';
import { ArticleComponent } from './room/article/room-article.component';
import { RoomContentComponent } from './room/content/room-content.component';
import { ProfileComponent } from './User/profile/profile.component';

import { AppRoutingModule } from './app-routing.module';
import { EntryModule } from './User/entry/entry.module';
import {MatCardModule} from '@angular/material/card';

import { UserService } from './services/user.service';

import { UserTokenInterceptor } from './User/interceptors/user.interceptor';
import { AuthenticationInterceptor } from './User/interceptors/auth.interceptor';
import { ArticleRoutingModule } from './room/article/article-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    EntryComponent,
    RoomContentComponent,
    ArticleComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ArticleRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    EntryModule,
    BrowserAnimationsModule,
  ],
  providers: [UserService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserTokenInterceptor,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
