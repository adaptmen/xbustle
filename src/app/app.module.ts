import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './user/user.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpModule
  ],
  providers: [
    AuthService,
    //UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
