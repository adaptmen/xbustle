import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScrollbarModule } from 'ngx-scrollbar';

import { UserComponent } from './user.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './tasks/add/add.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserRoutingModule,
    ScrollbarModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    TasksComponent,
    AddComponent
  ]
})
export class UserModule { }
