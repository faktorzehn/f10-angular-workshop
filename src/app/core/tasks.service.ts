import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../tasks/shared/task.model';
import { Observable } from 'rxjs';

/**
 * Ein Service wird als Singelton verwendet. In unserem Beispiel kommunizieren wir hier mit dem Backend.
 */
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.BACKEND}/tasks`);
  }

  getOne(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.BACKEND}/tasks/${id}`);
  }

  update(task: Task) {
    return this.http.put<Task>(`${environment.BACKEND}/tasks/${task.id}`, task);
  }

  create(task: Task) {
    return this.http.post<Task>(`${environment.BACKEND}/tasks/`, task);
  }
}
