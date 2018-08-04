import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'xb-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.sass']
})
export class RegComponent implements OnInit {

  formSignup: FormGroup;
  emailExist: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formSignup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }
  
  onSubmit() {
    this.authService.login(this.formSignup.value)
      .subscribe(
        (res) => {
          console.log(res)
        }
      );
  }
  
  onClick() {
  }

}
