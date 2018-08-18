import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { Answer } from '@models/answer.model';

@Component({
  selector: 'xb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }
  
  onSubmit() {
    this.authService.login(this.formLogin.value)
      .subscribe(
        (res: Answer) => {
          console.log(res);
          if (res.status_code == "user_found") {
            
            return this.router.navigate(["/user"]);
          }
        }
      );
  }
  
  onClick() {
  }

}
