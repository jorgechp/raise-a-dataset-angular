import {Component, inject, Input} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatStepperPrevious} from "@angular/material/stepper";
import {NgClass} from "@angular/common";


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
    ReactiveFormsModule,
    TranslocoDirective,
    MatStepperPrevious,
    NgClass
  ]
})
export class RaiseDatasetForm1Component {
  @Input() parentGroup: FormGroup | undefined;
  @Input() isRescue?: boolean;
  private fb = inject(FormBuilder);
}
