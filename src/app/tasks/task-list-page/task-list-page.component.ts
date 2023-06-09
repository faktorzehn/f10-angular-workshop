import { Component } from '@angular/core';
import { Task } from '../shared/task.model';
import { TasksService } from 'src/app/core/tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


/**
 * Die Komponente ist der Einstiegspunkt für die Listen Darstellung von Tasks.
 * Es werden die Tasks vom Service geholt und dann sortiert. Bei einem Klick auf ein Task oder dem "add button" wird die Navigation ausgelöst.
 */
@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss']
})
export class TaskListPageComponent {

  tasks?: Task[];
  sortByCoin?: 'UP' | 'DOWN';

  constructor(tasksService: TasksService) {
    tasksService.getAll().pipe(takeUntilDestroyed()).subscribe(t => {
      this.tasks = t;
      this.sortTasks(this.sortByCoin);
    });
  }

  onSortByCoin() {
    // DOWN - UP - UNDEFINED
    if(this.sortByCoin === 'DOWN') {
      this.sortByCoin = 'UP';
    } else if(this.sortByCoin === 'UP') {
      this.sortByCoin = undefined;
    } else {
      this.sortByCoin = 'DOWN';
    }

    this.sortTasks(this.sortByCoin);
    return this.sortByCoin;
  }

  private sortTasks(sort?: 'UP' | 'DOWN') {
    if(sort === 'DOWN') {
      this.tasks?.sort((t1, t2)=>t2.gold-t1.gold);
    }else if(this.sortByCoin === 'UP') {
      this.tasks?.sort((t1, t2)=>t1.gold-t2.gold);
    } else {
      this.tasks?.sort((t1, t2)=>t2.priority-t1.priority);
    }
  }
}
