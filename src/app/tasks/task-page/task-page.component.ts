import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, of, switchMap, tap } from 'rxjs';
import { TasksService } from 'src/app/core/tasks.service';
import { Task, TaskType } from '../shared/task.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent {

  id?: string;
  task?: Task;

  form = this.fb.nonNullable.group(
    {
      title: ['', [Validators.required]],
      description: [''],
      destination: ['', [Validators.required]],
      type: ['entern' as TaskType, [Validators.required]],
      priority: [0, [Validators.required, Validators.max(5)]],
      gold: [0, [Validators.required, Validators.max(1000000)]]
    }
  );

  constructor(private tasksService: TasksService, route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    route.paramMap.pipe(
      map(p => p.get('id')), // mapped die Map zu einer ID
      tap(id => {
        this.id = id ?? undefined;
        if(id === 'new') {
          this.form.reset();
        }
        return id;
      }), // setze ID an der Component
      filter(id => id!=null && id!='new'), // "brich ab" wenn die ID nicht vorhanden ist
      switchMap(id => id ? tasksService.getOne(id): of()), // hole den Task vom TasksService
      takeUntilDestroyed() // wenn die Komponente destroyed wird - schließe diese Subscription
    ).subscribe(task => {
      this.task = task;
      this.updateFormGroup(this.task);
    });
  }

  private updateFormGroup(task: Task) {
    this.form.patchValue(
      {
        title: task.title,
        description: task.description,
        destination: task.destination,
        type: task.type,
        priority: task.priority,
        gold: task.gold
      }
    );
  }

  save() {
    if(this.task && this.id != 'new') {
      this.tasksService.update(this.getTaskFromFormGroup()).pipe(first()).subscribe(() => {
        this.router.navigate(['tasks']);
      });
    }

    if(this.id === 'new') {
      const temp = this.getTaskFromFormGroup();
      temp.id = '';
      this.tasksService.create(temp).pipe(first()).subscribe(() => {
        this.router.navigate(['tasks']);
      });
    }
  }

  canSave() {
    return this.form && this.form.touched && !this.form.invalid;
  }

  getTaskFromFormGroup(): Task {
    return {
      id: this.task?.id ?? '',
      title: this.form.getRawValue().title,
      description: this.form.value.description ?? '', // direkter Zugriff auf value.* kann undefined sein, da ein Controll disabled sein kann
      destination: this.form.getRawValue().destination, // mit getRawValue() erhält man immer ein Wert - auch wenn das Controll eigentlich disabled ist
      type: this.form.getRawValue().type,
      priority: this.form.getRawValue().priority,
      gold: this.form.getRawValue().gold
    }
  }

  getError(id: string): string | undefined {
    if(this.form.touched) {
      const errors = this.form.get(id)?.errors;

      if(errors?.['max']) {
        return `Der Wert darf maximal ${errors?.['max'].max} sein.`;
      }

      if(errors?.['required']) {
        return `Pflichtfeld`;
      }
    }

    return undefined;
  }

}
