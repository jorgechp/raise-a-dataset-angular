import {Component, computed, inject, OnInit, ViewChild} from '@angular/core';

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
import {Router} from "@angular/router";


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
export class RaiseDatasetComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected isAddRepositoryMode: boolean = false;
  protected dataset: Dataset | undefined;

  public datasetForm = this.fb.group({
    name: [null, Validators.required],
    createdBy: [this.authenticationService.getCurrentUser().username, Validators.required],
    registeredBy: [this.authenticationService.getCurrentUser().username, Validators.required],
    description: [null, Validators.required],
    creationDate: [new Date().toISOString().slice(0, 10), Validators.required],
  });

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
              private raiseInstanceService: RaiseInstanceService,
              private router: Router) {

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['dataset']) {
      this.isAddRepositoryMode = true;
      this.dataset = state['dataset'];
    }
  }

  ngOnInit(): void {

  }

  onSubmit(): void {

    if (this.datasetForm && this.repositoryForm) {
      const currentUser = this.authenticationService.getCurrentUser().uri!;
      const selectedRepository: Repository = this.repositoryForm.get('repository')!.value!;

      const datasetToRegister: Dataset = (this.isAddRepositoryMode && this.dataset) ? this.dataset : new Dataset();

      if (!this.isAddRepositoryMode) {
        datasetToRegister.name = this.datasetForm.get('name')!.value!;
        datasetToRegister.createdBy = this.datasetForm.get('createdBy')!.value!;
        datasetToRegister.registeredBy = this.datasetForm.get('registeredBy')!.value!;
        datasetToRegister.creationDate = new Date(this.datasetForm.get('creationDate')!.value!).toISOString();
        datasetToRegister.registrationDate = new Date().toISOString();
        datasetToRegister.maintainedBy = [currentUser];
        datasetToRegister.description = this.datasetForm.get("description")!.value!;
        datasetToRegister.repositories = [selectedRepository];

        this.datasetService.add(datasetToRegister).subscribe(
          (newDataset: Dataset) => {
            this.addNewRaiseInstance(newDataset, selectedRepository);
          }
        )
      } else {
        this.addNewRaiseInstance(datasetToRegister, selectedRepository);
      }
    }
  }

  private addNewRaiseInstance(dataset: Dataset, repository: Repository) {
    const raiseInstance: RaiseInstance = new RaiseInstance();
    raiseInstance.dataset = dataset.uri;
    raiseInstance.repository = repository.uri;
    raiseInstance.doi = this.repositoryForm.get('doi')!.value!;
    raiseInstance.date = new Date().toISOString();
    raiseInstance.user = this.authenticationService.getCurrentUser().uri!;

    this.raiseInstanceService.add(raiseInstance).subscribe(() => {
      this.stepper?.next();
    })
  }
}
