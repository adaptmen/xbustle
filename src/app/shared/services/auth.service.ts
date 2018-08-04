import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  
  constructor(private http: Http) {}
  
  login(formData: object): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/login', { user: formData })
    .pipe(map((res) => {return res.json()}));
  }
  
  signup(formData: object): Observable<any> {
     return this.http.post('http://localhost:3000/api/user/signup', { user: formData })
    .pipe(map((res) => {return res.json()}));
  }
  
}