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

  constructor(
    private teamService: TeamService,
    private tasksService: TasksService
  ) { }
  
  formTask: FormGroup;
  private companions;
  
  ngOnInit() {
    this.formTask = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'desc': new FormControl(null, [Validators.required]),
      'executer': new FormControl(null, [Validators.required])
    });
    
    this.teamService.getAll()
      .subscribe(
        (res) => {
          this.companions = res;
        }
      );
  }
  
  onSubmit() {
    this.tasksService.add(this.formTask.value)
      .subscribe(
        (res) => {
          console.log(res)
        }
      );
  }

}
