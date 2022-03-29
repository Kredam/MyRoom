import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../model/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry-signin',
  templateUrl: './signin.component.html',
  styleUrls: []
})

export class SigninComponent implements OnInit {
  passwordState = "password"
  validForm : boolean = false
  name = new FormControl('', Validators.required)
  password = new FormControl('', Validators.required)

  loginForm = new FormGroup({
    name: this.name,
    password: this.password
  });

  userData : IUser = {
    username:"",
    password:"",
  }

  constructor(private _userService: UserService) { }

  showPassword(){
    if(this.passwordState === "password"){
      this.passwordState = "text"
      return;
    }
    this.passwordState = "password"
  }

  
  submitLoginForm(){
    console.log(this.loginForm.value)
    this.userData.username = this.name.value
    this.userData.password = this.password.value
    // console.log(this.userData)
    this._userService.loginUser(this.userData).subscribe()
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe()
  }

}
