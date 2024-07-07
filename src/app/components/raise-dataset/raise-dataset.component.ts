import {Component, inject} from '@angular/core';

import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {RaiseDatasetIntroComponent} from "./intro/raise-dataset-intro.component";
import {RaiseDatasetForm1Component} from "./form1/raise-dataset-form-1.component";


@Component({
  selector: 'app-raise-dataset',
  templateUrl: './raise-dataset.component.html',
  styleUrl: './raise-dataset.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatStepper,
    MatStep,
    MatStepperPrevious,
    MatStepperNext,
    ReactiveFormsModule,
    RaiseDatasetIntroComponent,
    RaiseDatasetForm1Component
  ]
})
export class RaiseDatasetComponent {
  private fb = inject(FormBuilder);

  public addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  onSubmit(): void {
    alert('Thanks!');
  }
}
