import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {AuthToken} from "../AuthToken";
import {AuthData} from "../AuthData";
import {Message} from "../Message";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [ApiService]
})
export class RegisterFormComponent implements OnInit {

  constructor(private api: ApiService) { }

  message: Message = {
    "message": ""
  };

  username!: string
  password!: string
  password2!: string

  user: AuthData = {
    "username": "",
    "password": ""
  };

  ngOnInit(): void {
  }

  usernameInputHandler(event: any) {
    this.username = event.target.value;
  }

  passwordInputHandler(event: any) {
    this.password = event.target.value;
  }

  password2InputHandler(event: any) {
    this.password2 = event.target.value;
  }

  sendData(): void {
    if (this.password === this.password2) {
      this.user.username = this.username;
      this.user.password = this.password;

      this.api.registration(this.user).subscribe((data: Message) => this.message = {
        message: data.message
      });
    } else {
      this.message.message = "Password must mach"
    }
  }
}
