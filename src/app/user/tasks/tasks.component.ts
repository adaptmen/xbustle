import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../../team/team.service';
import { TasksService } from './tasks.service';

@Component({
  selector: 'xb-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  constructor() {  }  
  
  ngOnInit() {
    
  }

}
