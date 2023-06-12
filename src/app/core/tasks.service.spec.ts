import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { environment } from 'src/environments/environment';
import { Task } from '../tasks/shared/task.model';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get all tasks', () => {
    service.getAll().subscribe();

    const req = httpTestingController.expectOne(`${environment.BACKEND}/tasks`);
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('should call get one task', () => {
    service.getOne('123').subscribe();

    const req = httpTestingController.expectOne(`${environment.BACKEND}/tasks/123`);
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('should call update one task', () => {
    const task = new Task();
    task.id='456';
    service.update(task).subscribe();

    const req = httpTestingController.expectOne(`${environment.BACKEND}/tasks/456`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(task);
    httpTestingController.verify();
  });
});
