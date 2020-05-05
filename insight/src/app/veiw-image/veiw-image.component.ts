import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';

@Component({
  selector: 'app-veiw-image',
  templateUrl: './veiw-image.component.html',
  styleUrls: ['./veiw-image.component.css']
})
export class VeiwImageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VeiwImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) { }


  ngOnInit() {
    console.log(this.data.imageUrl)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
