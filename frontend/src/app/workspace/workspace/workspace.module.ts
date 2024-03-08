import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { NavigationModule } from '../navigation/navigation.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationModule,
    RouterModule
  ]
})
export class WorkspaceModule { }
