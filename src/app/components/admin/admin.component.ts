import {Component} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminRepositoriesComponent} from "./admin-repositories/admin-repositories.component";
import {AdminDatasetsComponent} from "./admin-datasets/admin-datasets.component";
import {NgIf} from "@angular/common";
import {RaiseInstanceComponent} from "../raise-instance/raise-instance.component";
import {AdminInstancesComponent} from "./admin-instances/admin-instances.component";
import {AdminComplianceComponent} from "./admin-compliance/admin-compliance.component";
import {AdminMissionComponent} from "./admin-mission/admin-mission.component";

@Component({
  selector: 'app-admin-tab',
  standalone: true,
    imports: [MatTabsModule, AdminUsersComponent, AdminRepositoriesComponent, AdminDatasetsComponent, NgIf, RaiseInstanceComponent, AdminInstancesComponent, AdminComplianceComponent, AdminMissionComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
