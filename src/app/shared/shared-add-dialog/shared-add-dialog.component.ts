import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-add-dialog',
  templateUrl: './shared-add-dialog.component.html',
  styleUrls: ['./shared-add-dialog.component.css']
})
export class SharedAddDialogComponent implements OnInit {

  todoForm !: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SharedAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.data.edit) {
      this.todoForm.patchValue({
        item: this.data.editedTask.description
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if(this.data.description.length > 0)
      this.dialogRef.close(this.data);
    else 
      this.onNoClick(); 
  }

}
