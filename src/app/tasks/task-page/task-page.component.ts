import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { TasksService } from 'src/app/core/tasks.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent {

  id?: string;
  task?: Task;

  constructor(tasksService: TasksService, route: ActivatedRoute) {
    route.paramMap.pipe(
      map(p => p.get('id')), // mapped die Map zu einer ID
      tap(id => this.id = id ?? undefined), // setze ID an der Component
      filter(id => id!=null), // "brich ab" wenn die ID nicht vorhanden ist
      switchMap(id => id ? tasksService.getOne(id): of()), // hole den Task vom TasksService
      takeUntilDestroyed() // wenn die Komponente destroyed wird - schließe diese Subscription
    ).subscribe(task => {
      this.task = task;
    });
  }

}
