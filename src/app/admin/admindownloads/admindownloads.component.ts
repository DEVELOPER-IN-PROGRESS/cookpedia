import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';

@Component({
  selector: 'app-admindownloads',
  imports: [AdminheaderComponent,AdminsidebarComponent],
  templateUrl: './admindownloads.component.html',
  styleUrl: './admindownloads.component.css'
})
export class AdmindownloadsComponent {

}
