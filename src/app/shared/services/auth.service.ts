import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer } from "@models/answer.model";

@Injectable()
export class AuthService implements CanActivate {
  
  constructor(private http: Http) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.http.get('http://localhost:3000/api/user/islogged')
    .pipe(
      map(res => res.json()), 
      map((res: Answer) => {
        return res.status_code == "user_found" ? true : false
      })
    );
  }
  
  login(formData: object): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/login', { user: formData })
    .pipe(map((res) => {return res.json()}));
  }
  
  signup(formData: object): Observable<any> {
     return this.http.post('http://localhost:3000/api/user/signup', formData)
    .pipe(map((res) => {return res.json()}));
  }
  
}