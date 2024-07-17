import {Component, computed, inject, ViewChild} from '@angular/core';

import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {RaiseDatasetIntroComponent} from "./intro/raise-dataset-intro.component";
import {RaiseDatasetForm1Component} from "./form1/raise-dataset-form-1.component";
import {RaiseDatasetForm2Component} from "./form2/raise-dataset-form-2.component";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {DOIRexp} from "../utils/regexp/regexps";
import {CommonModule} from "@angular/common";
import {Dataset} from "../../domain/dataset";
import {DatasetService} from "../../services/dataset/dataset.service";
import {Repository} from "../../domain/repository";
import {RaiseInstance} from "../../domain/raise-instance";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {TranslocoDirective} from "@jsverse/transloco";


@Component({
  selector: 'app-raise-dataset',
  templateUrl: './raise-dataset.component.html',
  styleUrl: './raise-dataset.component.scss',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, provideNativeDateAdapter()],
  imports: [
    CommonModule,
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
    RaiseDatasetForm1Component,
    RaiseDatasetForm2Component,
    TranslocoDirective
  ]
})
export class RaiseDatasetComponent {
  public datasetForm = this.fb.group({
    name: [null, Validators.required],
    author: [this.authenticationService.getCurrentUser().username, Validators.required],
    description: [null, Validators.required],
    creationDate: [new Date().toISOString().slice(0, 10), Validators.required],
  });

  private fb = inject(FormBuilder);
  public repositoryForm = this.fb.group({
    repository: [null, Validators.required],
    doi: [null, Validators.compose([Validators.required, Validators.pattern(DOIRexp)])],

  });
  @ViewChild('stepper') private stepper: MatStepper | undefined;
  private readonly dateFormatString = computed(() => {
    return 'DD/MM/YYYY';
  });

  constructor(private authenticationService: AuthenticationService,
              private datasetService: DatasetService,
              private raiseInstanceService: RaiseInstanceService) {

  }

  onSubmit(): void {

    if (this.datasetForm && this.repositoryForm) {
      const currentUser = this.authenticationService.getCurrentUser().uri!;
      const selectedRepository: Repository = this.repositoryForm.get('repository')!.value!;

      const newDataset: Dataset = new Dataset();
      newDataset.name = this.datasetForm.get('name')!.value!;
      newDataset.author = this.datasetForm.get('author')!.value!;
      newDataset.creationDate = new Date(this.datasetForm.get('creationDate')!.value!).toISOString();
      newDataset.registrationDate = new Date().toISOString();
      newDataset.authorInSystem = [currentUser]
      newDataset.description = this.datasetForm.get("description")!.value!;
      newDataset.repositories = [selectedRepository];

      this.datasetService.add(newDataset).subscribe(
        (newDataset: Dataset) => {
          const raiseInstance: RaiseInstance = new RaiseInstance();
          raiseInstance.dataset = newDataset.uri;
          raiseInstance.repository = selectedRepository.uri;
          raiseInstance.doi = this.repositoryForm.get('doi')!.value!;
          raiseInstance.date = new Date().toISOString();
          raiseInstance.user = currentUser;

          this.raiseInstanceService.add(raiseInstance).subscribe((raiseInstance) => {
            this.stepper?.next();
          })
        }
      )

    }


  }


}
