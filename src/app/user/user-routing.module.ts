import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './tasks/add/add.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'user', component: UserComponent, children: [
    { path: 'tasks', component: TasksComponent, children: [
      { path: 'add', component: AddComponent }
    ] },
    { path: 'settings', component: SettingsComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {}