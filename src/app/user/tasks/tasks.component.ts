import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '@team/team.service';
import { TasksService } from './tasks.service';
import { UserService } from '@user/user.service';
import { User } from '@models/user.model';

@Component({
  selector: 'xb-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  
  currentUser: User;
  
  constructor(private userService: UserService) {
    this.userService.onUserInit.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );
  }  
  
  
  ngOnInit() {
    
  }

}
