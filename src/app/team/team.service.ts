import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer } from '@models/answer.model';


@Injectable()
export class TeamService {
  
  constructor(private http: Http) {}
  
  public getAll() {
    return this.http.get('http://localhost:3000/api/team/getall')
            .pipe(map(res => res.json()));
  }
  
}