import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { userService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any
  password: any


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  constructor(private myuserService: userService, private myRouter: Router) { }

  ngOnInit() {
  }


  login() {

    const { password, email } = this
    if (email && password) {
      this.myuserService.login({ password, email }).subscribe((resp: any) => {
        if (resp.message == 'success') {
          this.myRouter.navigate(['/home'])
          localStorage.setItem('token', resp.token)
        }else{
          window.alert('invalid Email of Password')
        }

      })

    } else {
      window.alert('enter data')
    }
  }

}
