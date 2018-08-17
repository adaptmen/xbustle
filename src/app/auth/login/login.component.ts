import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'xb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }
  
  onSubmit() {
    this.authService.login(this.formLogin.value)
      .subscribe(
        (res) => {
          console.log(res)
        }
      );
  }
  
  onClick() {
  }

}
