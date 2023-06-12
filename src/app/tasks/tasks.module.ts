import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListPageComponent } from './task-list-page/task-list-page.component';
import { TaskListComponent } from './shared/task-list/task-list.component';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TaskListPageComponent,
    TaskListComponent,
    TaskCardComponent,
    TaskPageComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TasksModule { }
