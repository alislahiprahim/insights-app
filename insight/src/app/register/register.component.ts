import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { userService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: any
  username: any
  password: any


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  constructor(private myuserService: userService, private myRouter: Router) { }

  ngOnInit() {
  }


  register() {

    const { username, password, email } = this
    this.myuserService.register({ username, password, email }).subscribe((resp: any) => {
      console.log(resp)
      if (resp.message == 'success') {
        this.myRouter.navigate(['/home'])
        localStorage.setItem('token', resp.token)
      }
    })

  }

}
