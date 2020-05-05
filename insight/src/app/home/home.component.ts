import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { userService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeiwImageComponent } from '../veiw-image/veiw-image.component';
import lodash from 'lodash'

export interface DialogData {
  imageUrl: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userArray: any;

  constructor(private myuserService: userService, private dialog: MatDialog, private MyelementRef: ElementRef, private myRouter: Router, @Inject(DOCUMENT) private _document) { }

  ngAfterViewInit() {
    this.MyelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e5e5e5'
  }

  ngOnInit() {

    if (this.userArray) { } else {
      this.getUsers()
    }
  }


  getUsers() {
    this.myuserService.getImages().subscribe((resp: any) => {
      this.userArray = resp.data

    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.myRouter.navigate(['/login'])
        }
      }
    })
  }

  openDialog(url): void {

    const dialogRef = this.dialog.open(VeiwImageComponent, {
      data: { imageUrl: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  userProfile(userid) {
    this.myRouter.navigate(['/profile', userid])
  }
}


