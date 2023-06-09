import { Component, Input } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task?: Task;

  typeColor() {
    switch(this.task?.type) {
      case 'entern': return '#FFB3B3';
      case 'erpressen': return '#C1EFFF';
      case 'suchen': return'#FFE9AE';
      default: return'';
    }
  }
}
