import { Component, OnInit } from '@angular/core';
import { UploadModelModule } from '../upload-model/upload.module';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UploadImageComponent>) { }

  isHovering: boolean;

  files: File[] = [];

  ngOnInit() {
  }



  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



