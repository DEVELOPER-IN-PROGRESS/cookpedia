import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';

@Component({
  selector: 'app-adminrequests',
  imports: [AdminheaderComponent,AdminsidebarComponent],
  templateUrl: './adminrequests.component.html',
  styleUrl: './adminrequests.component.css'
})
export class AdminrequestsComponent {

}
