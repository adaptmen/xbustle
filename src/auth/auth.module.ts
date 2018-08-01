import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, RegComponent, AuthComponent]
})
export class AuthModule { }
