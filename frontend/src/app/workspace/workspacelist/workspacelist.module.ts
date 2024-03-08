import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspacelistComponent } from './workspacelist.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WorkspacelistComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class WorkspacelistModule { }
