import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';

import { AuthService } from '@shared/services/auth.service';
import { SocketService } from '@shared/services/socket.service';
import { UserService } from '@user/user.service';
import { TasksService } from '@user/tasks/tasks.service';
import { TeamService } from '@team/team.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UserModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
  ],
  providers: [
    SocketService,
    AuthService,
    UserService,
    TasksService,
    TeamService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
