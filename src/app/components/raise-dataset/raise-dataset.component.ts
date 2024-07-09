import {Component, computed, inject} from '@angular/core';

import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {RaiseDatasetIntroComponent} from "./intro/raise-dataset-intro.component";
import {RaiseDatasetForm1Component} from "./form1/raise-dataset-form-1.component";
import {DateRegx} from "../utils/regexp/regexps";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {AuthenticationService} from "../../services/authentication/authentication.service";


@Component({
  selector: 'app-raise-dataset',
  templateUrl: './raise-dataset.component.html',
  styleUrl: './raise-dataset.component.scss',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, provideNativeDateAdapter()],
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
    name: [null, Validators.required],
    author: [this.authenticationService.getCurrentUser().username, Validators.required],
    creationDate: [new Date().toISOString().slice(0, 10), Validators.compose([
      Validators.required, Validators.pattern(DateRegx)
    ])]
  });
  private readonly dateFormatString = computed(() => {
    return 'DD/MM/YYYY';
  });

  constructor(private authenticationService: AuthenticationService) {

  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
