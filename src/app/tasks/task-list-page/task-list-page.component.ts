import { Component } from '@angular/core';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss']
})
export class TaskListPageComponent {

  tasks?: Task[] = [
    {id: "1", title: "Schiff entern", description: "Das Schiff von der englischen Flotte entern.", priority: 5, destination: "Bermuda Dreieck", type:"entern", gold: 1000}
  ]

}
