import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from '../../../team/team.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'xb-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

  constructor(
    private teamService: TeamService,
    private tasksService: TasksService
  ) 
  {
    this.teamService = teamService;
    this.tasksService = tasksService;
  }
  
  private formTask: FormGroup;
  private companions = [];
  private notes = [];
  
  
  ngOnInit() {
    this.formTask = new FormGroup({
      'title': new FormControl("", [Validators.required]),
      'desc': new FormControl("", [Validators.required]),
      'executer': new FormControl("", [Validators.required]),
      'notes': new FormControl("")
    });
    
    this.teamService.getAll()
      .subscribe(
        (res) => {
          this.companions = res.result;
        }
      );
  }
  
  
  addTask() {
    console.log(this.formTask);
    this.tasksService.add(this.formTask.value)
      .subscribe(
        (res) => {
          console.log(res)
        }
      );
  }

  addNote(event) {
    this.notes.push(this.formTask.get('notes').value);
  }

}
