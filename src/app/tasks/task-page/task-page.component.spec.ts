import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPageComponent } from './task-page.component';
import { Task } from '../shared/task.model';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TasksService } from 'src/app/core/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FieldComponent } from 'src/app/shared/field/field.component';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let element: HTMLElement;

  const tasksService = jasmine.createSpyObj('TasksService', ['getOne']);
  const task: Task = {id: '1', description: 'description', destination: 'destination', title: 'title', type: 'entern', gold: 1, priority: 3};
  tasksService.getOne.and.returnValue(of(task));

  function initTestBed(id: string) {
    TestBed.configureTestingModule({
      declarations: [TaskPageComponent, FieldComponent],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(new Map<string, string>([
              ['id', id]
            ]))
          }
        },
        { provide: TasksService, useValue: tasksService }
      ],
      imports: [ ReactiveFormsModule, RouterTestingModule ]
    });
    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  }

  it('should create', () => {
    initTestBed('new');
    expect(component.id).toBe('new');
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be filled with data from task', () => {
      initTestBed('1');

      expect(component.form.value.description).toBe(task.description);
      expect(component.form.value.destination).toBe(task.destination);
      expect(component.form.value.title).toBe(task.title);
      expect(component.form.value.type).toBe(task.type);
      expect(component.form.value.gold).toBe(task.gold);
      expect(component.form.value.priority).toBe(task.priority);
      expect(component.task).toBe(task);
      expect(component.id).toBe('1');
    });

    it('should be unable to save (because untouched)', () => {
      initTestBed('1');

      expect(component.task).toBe(task);
      expect(component.id).toBe('1');
      expect(element.getElementsByTagName('button')[0].disabled).toBeTrue();
    });

    it('should be valid and able to save (because touched)', () => {
      initTestBed('1');
      component.form.markAsTouched();

      fixture.detectChanges();

      expect(component.task).toBe(task);
      expect(component.id).toBe('1');
      expect(element.getElementsByTagName('button')[0].disabled).toBeFalse();
      expect(component.form.status).toBe('VALID');
    });

    it('should be invalid and not able to save (even after touching)', () => {
      initTestBed('1');

      const input = element.querySelector("input[formControlName='destination']") as HTMLInputElement;
      input.focus();
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.blur();

      component.form.markAsTouched();
      fixture.detectChanges();

      expect(component.task).toBe(task);
      expect(component.id).toBe('1');
      expect(element.getElementsByTagName('button')[0].disabled).toBeTrue();
      expect(component.form.status).toBe('INVALID');
    });

    it('should be invalid because of gold', () => {
      initTestBed('1');

      component.form.get('gold')?.setValue(1000000);
      expect(component.form.invalid).withContext('1.000.000 should be allowed').toBeFalse();

      component.form.get('gold')?.setValue(1000001);
      expect(component.form.invalid).withContext('1.000.001 should not be allowed anymore').toBeTrue();
    });
  });
});
