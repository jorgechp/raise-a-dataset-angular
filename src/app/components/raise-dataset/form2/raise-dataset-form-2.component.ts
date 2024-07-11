import {Component, inject, Input} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";


@Component({
  selector: 'app-raise-dataset-form-2',
  templateUrl: './raise-dataset-form-2.component.html',
  styleUrl: './raise-dataset-form-2.component.scss',
  standalone: true,
  imports: [
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
    ReactiveFormsModule
  ]
})
export class RaiseDatasetForm2Component {
  @Input() parentGroup: FormGroup | undefined;
  public isAlreadyInRepository: boolean = true;
  private fb = inject(FormBuilder);
}
