import {Component, Input} from '@angular/core';

import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RepositorySelectionComponent} from "../../repository-selection/repository-selection.component";
import {Repository} from "../../../domain/repository";
import {CommonModule} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";


@Component({
  selector: 'app-raise-dataset-form-2',
  templateUrl: './raise-dataset-form-2.component.html',
  styleUrl: './raise-dataset-form-2.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormField,
    MatDatepicker,
    MatCheckboxModule,
    MatDatepickerToggle,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RepositorySelectionComponent,
    TranslocoDirective
  ]
})
export class RaiseDatasetForm2Component {
  @Input() parentGroup: FormGroup | undefined;
  selectedRepository: Repository | undefined;

  handleSelectValue($event: Repository) {
    const currentDoiValue = this.parentGroup?.get('doi')!.value;
    this.parentGroup?.setValue({'repository': $event, 'doi': currentDoiValue});
    this.selectedRepository = $event;
  }
}
