import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';

@Component({
  selector: 'app-adminusers',
  imports: [AdminsidebarComponent,AdminheaderComponent],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {

}
