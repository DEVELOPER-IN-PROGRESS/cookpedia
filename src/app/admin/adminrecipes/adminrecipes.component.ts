import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent,AdminsidebarComponent],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {

}
