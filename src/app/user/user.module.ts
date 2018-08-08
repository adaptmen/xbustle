import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    TasksComponent
  ]
})
export class UserModule { }
