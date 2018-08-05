import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService implements CanActivate {
  
  constructor(private http: Http) {}
  
  private isLogin;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.isLogged().then((result) => {
      if (result.status_code == "user_found") {
        this.isLogin = true;
        return true;
      }
      else {
        this.isLogin = false;
        return false;
      }
    });
  }
  
  login(formData: object): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/login', { user: formData })
    .pipe(map((res) => {return res.json()}));
  }
  
  signup(formData: object): Observable<any> {
     return this.http.post('http://localhost:3000/api/user/signup', { user: formData })
    .pipe(map((res) => {return res.json()}));
  }
  
  isLogged() {
    return new Promise((resolve, reject) => { 
      this.http.get('http://localhost:3000/api/user/islogged')
      .pipe(map(res => res.json())).subscribe(resolve, reject);
    })
  }
  
}