import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'xb-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, authService: AuthService) { 
    this.router = router;
  }

  ngOnInit() {
    return this.router.navigate(['/login']);
  }

}
