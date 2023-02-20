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
  openAddTaskDialog(unique_id: any, isEdit: boolean, task ?:any): void {
    this.isUser = false;
    if(!isEdit) {
      var dialogRef = this.dialog.open(SharedAddDialogComponent, {
        data: { 
          description: this.taskDialogData, 
          editedTask: task,
          edit: isEdit,
          isUser: this.isUser
        }
      });

      dialogRef.afterClosed().subscribe((result: any) => {  
        this.tasks.push({
          description: result.description,
          user_id: unique_id
        })
      });

    } else {
      var dialogRef = this.dialog.open(SharedAddDialogComponent, {
        data: { 
          description: this.taskDialogData, 
          editedTask: task,
          edit: isEdit,
          isUser: this.isUser,
          user_id: unique_id
        }
      });
      dialogRef.afterClosed().subscribe((result: any) => { 
        console.log(result);
        
        const index = this.tasks.findIndex(data=> data.id === task.id);
        this.tasks[index]= result; 
      });
    }    
  }

// Open Dialog for adding User 
  openUserDialog(): void {
    this.isUser = true;
    const dialogRef = this.dialog.open(SharedAddDialogComponent, {
      data: { name: this.userDialogData, id: Math.random().toString(16).slice(2), isUser: this.isUser },
    });

    dialogRef.afterClosed().subscribe((result: User) => { 
      console.log(result);
           
      if (result != undefined && result) {
        this.users.push({
          name: result.name,
          id: result.id
        })
      }  
    });
  }

  // Edit the task 
  onEdit(unique_id: any, item: any): void {        
    this.isEditEnabled = true;
    this.openAddTaskDialog( unique_id, this.isEditEnabled, item)
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
