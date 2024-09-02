import {Component, inject} from '@angular/core';
import {TranslocoDirective} from "@jsverse/transloco";
import {GenericAdminComponent} from "../generic-admin/generic-admin.component";
import {MatCardContent} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {IGenericTableColumn} from "../../generic-table/generic-table.component";
import {RaiseInstanceService} from "../../../services/raise-instance/raise-instance.service";

@Component({
  selector: 'app-admin-instances',
  standalone: true,
  imports: [
    TranslocoDirective,
    GenericAdminComponent,
    MatCardContent,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-instances.component.html',
  styleUrl: './admin-instances.component.scss'
})
export class AdminInstancesComponent {
  form: FormGroup | undefined;
  protected endPointToCall = this.raiseInstanceService.getAllRaiseInstances;
  protected columns: IGenericTableColumn[] = [
    {
      nameDef: 'datasetName',
      i18nKey: 'instancesAdmin.datasetName'
    },
    {
      nameDef: 'repositoryName',
      i18nKey: 'instancesAdmin.repositoryName'
    }
  ];
  private fb = inject(FormBuilder);

  constructor(protected raiseInstanceService: RaiseInstanceService) {
  }

  prepareObjectToBeSent(item: any, isValidForm: any, onResult: any) {
    if (!this.form) return;
    item.datasetName = this.form.value.datasetName;
    item.repositoryName = this.form.value.repositoryName;
    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: any) {
    this.form = this.fb.group({
      datasetName: [$event.datasetName, Validators.required],
      repositoryName: [$event.repositoryName, Validators.required]
    })
  }

}
