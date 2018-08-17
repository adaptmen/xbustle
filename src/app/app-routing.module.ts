import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent} from '@user/user.component';
import { AuthService } from '@shared/services/auth.service';

const routes: Routes = [
  { path: 'user',
    component: UserComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
