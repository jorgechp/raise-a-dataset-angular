import {Component, inject} from '@angular/core';
import {IGenericTableColumn} from "../../generic-table/generic-table.component";
import {GenericAdminComponent} from "../generic-admin/generic-admin.component";
import {DatasetService} from "../../../services/dataset/dataset.service";
import {NgIf} from "@angular/common";
import {Dataset} from "../../../domain/dataset";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardContent} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-admin-datasets',
  standalone: true,
  imports: [
    GenericAdminComponent,
    NgIf,
    FormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslocoDirective
  ],
  templateUrl: './admin-datasets.component.html',
  styleUrl: './admin-datasets.component.scss'
})
export class AdminDatasetsComponent {
  form: FormGroup | undefined;
  protected columns: IGenericTableColumn[] = [
    {
      nameDef: 'name',
      i18nKey: 'datasetAdmin.name'
    },
    {
      nameDef: 'description',
      i18nKey: 'datasetAdmin.description'
    }
  ];
  private fb = inject(FormBuilder);


  constructor(protected datasetService: DatasetService) {
  }


  prepareObjectToBeSent(item: Dataset, isValidForm: any, onResult: any) {
    if (!this.form) return;
    item.name = this.form.value.name;
    item.description = this.form.value.description;
    isValidForm(this.form.valid);
    onResult(item);
  }

  prepareControls($event: Dataset) {
    this.form = this.fb.group({
      name: [$event.name, Validators.required],
      description: [$event.description, Validators.required]
    })
  }
}
