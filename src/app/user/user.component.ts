import { Component, OnInit, Injectable } from '@angular/core';
import { SocketService } from '@shared/services/socket.service';
import { UserService } from './user.service';
import { User } from '@models/user.model';

@Component({
  selector: 'xb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})

@Injectable()
export class UserComponent implements OnInit {
  
  currentUser: User;

  constructor(
    private sockService: SocketService,
    private userService: UserService
  ) {
    this.userService.onUserInit.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    )
  }
  
  
  ngOnInit() {
    
  }

}
