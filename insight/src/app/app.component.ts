import { Component } from '@angular/core';
import { userService } from './services/user.service';
import { MatDialog } from '@angular/material';
import { UploadImageComponent } from './upload-image/upload-image.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private myuserService: userService, private dialog: MatDialog) { }


  openDialog() {
    this.dialog.open(UploadImageComponent)
  }
}
