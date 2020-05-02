import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload-file.service';
import { UploadModelModule } from '../upload-model/upload.module';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private myUploadService: UploadService) { }

  images: any
  currentUpload: UploadModelModule;

  ngOnInit() {
  }

  selectImage(event) {

    const file = event.target.files[0];
    this.images = file;

    this.currentUpload = new UploadModelModule(this.images);
    console.log('1', this.currentUpload)


  }

  onSubmit() {
    this.myUploadService.pushUpload(this.currentUpload)

  }


}

