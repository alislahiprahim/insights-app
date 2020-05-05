import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  imageArr: any;

  constructor(private myActivatedRoute: ActivatedRoute, private myuserService: userService) { }

  ngOnInit() {
    const id = this.myActivatedRoute.snapshot.params.id
    this.getUserImages(id)
  }

  getUserImages(id) {
    this.myuserService.getUserImage({ id }).subscribe((resp: any) => {
      debugger
      this.imageArr = resp.images

    })
  }

}
