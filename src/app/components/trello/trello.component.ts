import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskModel } from 'src/app/models/task.nodel';
import { Delete, User } from 'src/app/models/user.model';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { SharedAddDialogComponent } from 'src/app/shared/shared-add-dialog/shared-add-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.scss']
})
export class TrelloComponent implements OnInit {

  todoForm !: FormGroup;
  tasks: TaskModel[] = [];
  users: User[] = [];
  userDialogData: User[] = [];
  taskDialogData: TaskModel[] = [];
  isEditEnabled: boolean = false;
  isUser:boolean = true;
  isDelete:boolean = false;

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  // Open Dialog for adding Task to specific user
  openAddTaskDialog(unique_id: any, task ?:any, isEdit = false): void {
    this.isUser = false;
    const dialogRef = this.dialog.open(SharedAddDialogComponent, {
      data: { 
        description: this.taskDialogData, 
        id: Math.random().toString(16).slice(2), 
        allTask: this.tasks,
        editedTask: task,
        edit: isEdit,
        isUser: this.isUser
      }
    });

    dialogRef.afterClosed().subscribe((result: TaskModel) => {      
      this.tasks.push({
        description: result.description,
        id: result.id,
        user_id: unique_id
      })
    });
    
  }

// Open Dialog for adding User 
  openUserDialog(): void {
    this.isUser = true;
    const dialogRef = this.dialog.open(SharedAddDialogComponent, {
      data: { name: this.userDialogData, id: Math.random().toString(16).slice(2), isUser: this.isUser },
    });

    dialogRef.afterClosed().subscribe((result: User) => {      
      if (result != undefined && result) {
        this.users.push({
          name: result.name,
          id: result.id
        })
      }  
    });
  }

  // Edit the task (inprogress)
  onEdit(item: any, i: any): void {    
    this.isEditEnabled = true;
    this.openAddTaskDialog(i, item, this.isEditEnabled)
  }

  // Confirm and Delete User
  deleteUser(i: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { 
        isDelete: this.isDelete
      }
    });
    
    dialogRef.afterClosed().subscribe((result: Delete) => {      
      if(result.isDelete) {
        this.users.splice(i, 1);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
