import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../model/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-entry-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent{
  passwordState = "password"
  profileForm = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  })

  constructor(private _userService: UserService) { }

  // this._userService.registerUser()
  submitForm(){
    const user : IUser = {
      username: this.profileForm.value.name,
      email: this.profileForm.value.email,
      password:this.profileForm.value.password,
      born: "2000-03-10"
    }
    console.log(user)
    this._userService.registerUser(user).subscribe(element => console.log("sikeres"))
  }

  showPassword(){
    if(this.passwordState === "password"){
      this.passwordState = "text"
      return;
    }
    this.passwordState = "password"
  }

  validateProfileForm(){
    const profile = Object.entries(this.profileForm)
    const emptyFields = profile.filter(userData => userData[1] === "").length
  }
}
