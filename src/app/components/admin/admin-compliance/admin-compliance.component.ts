import {Component, inject} from '@angular/core';
import {TranslocoDirective} from "@jsverse/transloco";
import {GenericAdminComponent} from "../generic-admin/generic-admin.component";
import {MatCardContent} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {IGenericTableColumn} from "../../generic-table/generic-table.component";
import {ComplianceService} from "../../../services/compliance/compliance.service";
import {ComplianceDtoService} from "../../../services/compliance/compliance-dto.service";

@Component({
  selector: 'app-admin-compliance',
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
  templateUrl: './admin-compliance.component.html',
  styleUrl: './admin-compliance.component.scss'
})
export class AdminComplianceComponent {
  form: FormGroup | undefined;
  protected endPointToCall = this.complianceDtoService.retrieveAllCompliancesDTO.bind(this.complianceDtoService);

  protected columns: IGenericTableColumn[] = [
    {
      nameDef: 'datasetName',
      i18nKey: 'complianceAdmin.datasetName'
    },
    {
      nameDef: 'repositoryName',
      i18nKey: 'complianceAdmin.repositoryName'
    },
    {
      nameDef: 'fairPrincipleName',
      i18nKey: 'complianceAdmin.fairPrincipleName'
    }
  ];
  private fb = inject(FormBuilder);

  constructor(protected complianceService: ComplianceService,
              protected complianceDtoService: ComplianceDtoService) {
  }

  prepareObjectToBeSent(item: any, isValidForm: any, onResult: any) {
    if (!this.form) return;
    item.datasetName = this.form.value.datasetName;
    item.repositoryName = this.form.value.repositoryName;
    item.fairPrincipleName = this.form.value.fairPrincipleName;
    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: any) {
    this.form = this.fb.group({
      datasetName: [$event.datasetName, Validators.required],
      repositoryName: [$event.repositoryName, Validators.required],
      fairPrincipleId: [$event.fairPrincipleId, Validators.required],
      fairPrincipleName: [$event.fairPrincipleName, Validators.required]
    })
  }

}
