import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {AdminUsersComponent} from "./admin-users/admin-users.component";

@Component({
  selector: 'app-admin-tab',
  standalone: true,
  imports: [MatTabsModule, AdminUsersComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
