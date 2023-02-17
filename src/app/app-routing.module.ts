import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrelloComponent } from './components/todo-list/trello.component';

const routes: Routes = [
  {path:'', component: TrelloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
