import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { Task } from '../task.model';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCardComponent]
    });
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('typeColor()', () => {

    it('should be red', () => {
      const task = new Task();
      task.type = 'entern';
      component.task = task;

      expect(component.typeColor()).toBe('#FFB3B3');
    });

    it('should be blue', () => {
      const task = new Task();
      task.type = 'erpressen';
      component.task = task;

      expect(component.typeColor()).toBe('#C1EFFF');
    });

    it('should be yellow', () => {
      const task = new Task();
      task.type = 'suchen';
      component.task = task;

      expect(component.typeColor()).toBe('#FFE9AE');
    });

    it('should be yellow in HTML', () => {
      const task = new Task();
      task.type = 'suchen';
      component.task = task;
      fixture.detectChanges();

      const typeElement = element.getElementsByClassName('type')[0] as HTMLElement;
      expect(typeElement.style.backgroundColor).toBe('rgb(255, 233, 174)');
    });

  });
});
