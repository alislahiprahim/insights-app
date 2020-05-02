import { Component, OnInit } from '@angular/core';
import { userService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageArr: any

  constructor(private myuserService: userService, private myRouter:Router) { }

  ngOnInit() {
    if (this.imageArr) { } else {
      this.getImages()
    }
  }


  getImages() {
    this.myuserService.getImages().subscribe((resp: any) => {

      this.imageArr = resp.data
    }, (err: any) => {
      if (err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.myRouter.navigate(['/login'])
        }
      }
    })
  }
}
