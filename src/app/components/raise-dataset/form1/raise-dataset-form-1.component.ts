import {Component, inject, Input} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";


@Component({
  selector: 'app-raise-dataset-form-1',
  templateUrl: './raise-dataset-form-1.component.html',
  styleUrl: './raise-dataset-form-1.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class RaiseDatasetForm1Component {
  @Input() parentGroup: FormGroup | undefined;
  private fb = inject(FormBuilder);
}
