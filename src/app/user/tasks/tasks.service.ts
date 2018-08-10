import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusNote } from "../../models/status-note.model";


@Injectable()
export class TasksService {
  
  constructor(private http: Http) {}
  
  public add(formData: object) {
    return this.http.post('http://localhost:3000/api/tasks/add', { task: formData })
            .pipe(map(res => res.json()));
  }
  
}