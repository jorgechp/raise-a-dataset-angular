import {Component} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminRepositoriesComponent} from "./admin-repositories/admin-repositories.component";
import {AdminDatasetsComponent} from "./admin-datasets/admin-datasets.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-tab',
  standalone: true,
  imports: [MatTabsModule, AdminUsersComponent, AdminRepositoriesComponent, AdminDatasetsComponent, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
