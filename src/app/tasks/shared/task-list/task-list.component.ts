import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() tasks?: Task[];
  @Output() byClick = new EventEmitter<Task>();

  /**
   * Eine trackBy Funktion hilft Anuglar bei einem *ngFor die Liste effizient zu rendern.
   */
  trackById(index: number, task: Task) {
    return task.id;
  }

}
