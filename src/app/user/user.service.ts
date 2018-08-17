import { Http } from '@angular/http';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { User } from '@models/user.model';
import { SocketService } from '@shared/services/socket.service';
import { Subject } from 'rxjs';

@Injectable()
export class UserService implements OnInit {
  
  public onUserInit = new Subject();
  
  constructor(private http: Http, private socketService: SocketService) {
    this.socketService.on('user_init').subscribe(
      (data) => {
        console.log('Success user [contructor]: ', data);
        this.onUserInit.next(data);
      },
      (error) => {
          console.log('Error: ', error);
      }
    )
  }
  
  ngOnInit() {
    
  }
  
}