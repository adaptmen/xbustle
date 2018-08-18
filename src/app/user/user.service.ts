import { Http } from '@angular/http';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { User } from '@models/user.model';
import { SocketService } from '@shared/services/socket.service';
import { Observable, pipe, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService implements OnInit {
  
  public onUserInit = new Subject();
  public currentUser: User;
  
  constructor(private http: Http, private socketService: SocketService) {
    this.socketService.on('user_init').subscribe(
      (data) => {
        this.onUserInit.next(data);
      },
      (error) => {
          console.log('Error: ', error);
      }
    )
  }
  
  ngOnInit() {
    
  }
  
  update(user: User) {
    return this.http.put('http://localhost:3000/api/user/update', { user })
    .pipe(map((res) => {return res.json()}));
  }
  
}