import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let element: HTMLElement;
  const APP_TASK_CARD = 'app-task-card';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent, TaskCardComponent]
    });
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 tasks', () => {
    const tasks: Task[] = [new Task(), new Task()];
    component.tasks = tasks;

    fixture.detectChanges();

    const cards = element.getElementsByTagName(APP_TASK_CARD);
    expect(cards).toHaveSize(2);
  });

  it('should emit an event when clicking on one task', () => {
    const task = new Task();
    task.id = '123';
    component.tasks = [task];
    spyOn(component.byClick, 'emit');

    fixture.detectChanges();
    const card = element.getElementsByTagName(APP_TASK_CARD)[0] as HTMLElement;
    card.click();

    expect(component.byClick.emit).toHaveBeenCalled();
    expect(component.byClick.emit).toHaveBeenCalledWith(task);
  });
});
