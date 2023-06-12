import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TaskListPageComponent } from './task-list-page.component';
import { TaskListComponent } from '../shared/task-list/task-list.component';
import { TaskCardComponent } from '../shared/task-card/task-card.component';
import { TaskPageComponent } from '../task-page/task-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TasksService } from 'src/app/core/tasks.service';
import { Task } from '../shared/task.model';
import { of } from 'rxjs';
import { Location } from '@angular/common';

describe('TaskListPageComponent', () => {
  let component: TaskListPageComponent;
  let fixture: ComponentFixture<TaskListPageComponent>;
  let element: HTMLElement;
  let location: Location;

  const tasks: Task[] = [
    {id: '1', description: '', destination: '', title: '', type: 'entern', gold: 1, priority: 3},
    {id: '2', description: '', destination: '', title: '', type: 'entern', gold: 2, priority: 1},
    {id: '3', description: '', destination: '', title: '', type: 'entern', gold: 3, priority: 2},
  ];

  const tasksService = jasmine.createSpyObj('TasksService', ['getAll']);
  tasksService.getAll.and.returnValue(of(tasks));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListPageComponent, TaskListComponent, TaskCardComponent],
      imports: [RouterTestingModule.withRoutes([{path:'tasks/new', component: TaskPageComponent}])],
      providers: [
        {provide: TasksService, useValue: tasksService}
      ]
    });
    fixture = TestBed.createComponent(TaskListPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add button should navigate to new task page', fakeAsync(() => {
    (element.getElementsByClassName('add-button')[0] as HTMLElement).click();

    tick();

    expect(location.path()).toBe('/tasks/new');
  }));

  describe('sorting', () => {
    it('should sort coins down', () => {
      getSortButton().click();

      fixture.detectChanges();

      expect(component.tasks).toBeDefined();
      expect(component.sortByCoin).toBe('DOWN');
      if(component.tasks) {
        expect(component.tasks[0].id).toBe('3');
        expect(component.tasks[1].id).toBe('2');
        expect(component.tasks[2].id).toBe('1');
      }
    });

    it('should sort coins up', () => {
      getSortButton().click();
      getSortButton().click();

      fixture.detectChanges();

      expect(component.tasks).toBeDefined();
      expect(component.sortByCoin).toBe('UP');
      if(component.tasks) {
        expect(component.tasks[0].id).toBe('1');
        expect(component.tasks[1].id).toBe('2');
        expect(component.tasks[2].id).toBe('3');
      }
    });

    it('should sort priority down (default)', () => {
      expect(component.tasks).toBeDefined();
      expect(component.sortByCoin).toBeUndefined();
      if(component.tasks) {
        expect(component.tasks[0].id).toBe('1');
        expect(component.tasks[1].id).toBe('3');
        expect(component.tasks[2].id).toBe('2');
      }
    });

  })

  function getSortButton(): HTMLElement {
    return element.getElementsByClassName('filter-bar')[0].getElementsByTagName('button')[0] as HTMLElement;
  }
});
