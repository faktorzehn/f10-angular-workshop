import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskListPageComponent } from './task-list-page/task-list-page.component';

/**
 * Teil Routen. Alles aus dem Feature Modul läuft unter /tasks/... (siehe app-routing.module.ts)
 * Hier werden die weiteren Routen definiert.  Schlussendlich kann man dann also aufrufen
 * /tasks/123 (123 ist ein Beispiel)
 * /tasks/new
 * /tasks
 */
const routes: Routes = [
  { path: ':id', component: TaskPageComponent },
  { path: 'new', component: TaskPageComponent },
  { path: '', component: TaskListPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
