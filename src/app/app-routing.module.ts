import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * Hier werden die unterschiedlichen Routen definiert. Wenn ein Modul statt einer Komponente geladen wird, befinden sich dort ebenfall Teilabschnitte der Route.
 */
const routes: Routes = [
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(t => t.TasksModule)}, // hier wird zu einem späteren Zeitpunkt (wenn die Route aufgerufen wird) das Task Modul nachgeladen
  { path: '', redirectTo: '/tasks', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent} // '**' bedeuten, dass jede andere Route hiermit matchen soll
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
