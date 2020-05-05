import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userService } from '../services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  imageArr: any;
  id: any
  heartStyle: string = 'heart';
  constructor(private myActivatedRoute: ActivatedRoute, private myuserService: userService, private myelementRef: ElementRef) {

  }

  ngOnInit() {
    this.id = this.myActivatedRoute.snapshot.params.id
    this.getUserImages(this.id)
  }

  getUserImages(id) {
    this.myuserService.getUserImage({ id }).subscribe((resp: any) => {

      this.imageArr = resp.images

    })
  }
  OnRightClick() {
    return false;
  }
  rating(imageid) {
    if (this.heartStyle == 'heart') {
      this.heartStyle = 'heartRed'
      // this.myuserService.rate({ userId: this.id, imageid: imageid, r: 1 }).subscribe((resp) => {
      //   console.log(resp)
      // })

    } else {
      this.heartStyle = 'heart'
      // this.myuserService.rate({ userId: this.id, imageid: imageid, r: -1 }).subscribe((resp) => {
      //   console.log(resp)
      // })

    }

  }
}
