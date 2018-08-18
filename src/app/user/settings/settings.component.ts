import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@user/user.service';
import { User } from '@models/user.model';

@Component({
  selector: 'xb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {

  user: User;
  formUser: FormGroup;
  nameMatches: {};
  
  
  constructor(private userService: UserService) {
    this.userService.onUserInit.subscribe(
      (user: User) => {
        this.user = user;
        this.nameMatches = user.name.match('([а-яА-Я]+)[ ]?([а-яА-Я]+)?[ ]?([а-яА-Я]+)?');
        this.onInit();
      }
    )
  }

  onInit() {
    this.formUser = new FormGroup({
      'login': new FormControl(this.user.login, [Validators.required]),
      'password': new FormControl(this.user.password, [Validators.required]),
      'name': new FormControl(this.user.name, [Validators.required]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email])
    });
  }
  
  onSubmit() {
    let updated_user = {
      name: this.formUser.get('name').value,
      login: this.formUser.get('login').value,
      password: this.formUser.get('password').value,
      email: this.formUser.get('email').value
    };
    
    this.userService.update(updated_user).subscribe(res => console.log(res));
  }

}
