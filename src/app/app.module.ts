import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';
import { UserModule } from './user/user.module';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './user/user.service';
import { TasksService } from './user/tasks/tasks.service';
import { TeamService } from './team/team.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
    UserModule
  ],
  providers: [
    AuthService,
    UserService,
    TasksService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
