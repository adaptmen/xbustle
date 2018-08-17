import { Component, OnInit } from '@angular/core';
import { SocketService } from '@shared/services/socket.service';

import { UserComponent } from '@user/user.component';

@Component({
  selector: 'xb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  constructor() {
  }
  
  ngOnInit() {
       
  }
  
}
