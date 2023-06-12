import { Component } from '@angular/core';

/**
 * Die App Component ist in der Regel die Komponente die als erstes aufgerufen wird und von der dann weitere Komponenten geladen werden (durch routing).
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'piraten-app';
}
